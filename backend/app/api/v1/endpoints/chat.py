
router = APIRouter()

"""
https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Authentication_Cheat_Sheet.md
Specifies minimum criteria:
    - Change password must require current password verification to ensure that it's the legitimate user.
    - Login page and all subsequent authenticated pages must be exclusively accessed over TLS or other strong transport.
    - An application should respond with a generic error message regardless of whether:
        - The user ID or password was incorrect.
        - The account does not exist.
        - The account is locked or disabled.
    - Code should go through the same process, no matter what, allowing the application to return in approximately
      the same response time.
    - In the words of George Orwell, break these rules sooner than do something truly barbaric.

See `security.py` for other requirements.
"""

@router.post("/magic/{email}", response_model=schemas.WebToken)
async def login_with_magic_link(*, db: AgnosticDatabase = Depends(deps.get_db), email: str) -> Any:
    """
    First step of a 'magic link' login. Check if the user exists and generate a magic link. Generates two short-duration
    jwt tokens, one for validation, one for email. Creates user if not exist.
    """
    user = await crud.user.get_by_email(db, email=email)
    if not user:
        user_in = schemas.UserCreate(**{"email": email})
        user = await crud.user.create(db, obj_in=user_in)
    if not crud.user.is_active(user):
        # Still permits a timed-attack, but does create ambiguity.
        raise HTTPException(status_code=400, detail="A link to activate your account has been emailed.")
    tokens = security.create_magic_tokens(subject=user.id)
    if settings.email_platform.EMAILS_ENABLED and user.email:
        # Send email with user.email as subject
        send_magic_login_email(email_to=user.email, token=tokens[0])
    return {"claim": tokens[1]}