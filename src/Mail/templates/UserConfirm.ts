export const UserConfirmHTML = (token: string) => `
<a 
    href="http://192.168.0.25:3000/auth/confirm?token=${token}"
    style="padding:10px 15px;color:white;background-color:black;"
>
    Confirm Account
</a>
`;
