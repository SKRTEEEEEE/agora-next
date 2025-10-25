export const getUrl=() => {
    return process.env.TEST_ENV === "production" ?  "https://profile-next-kappa.vercel.app":"http://localhost:3000";
}