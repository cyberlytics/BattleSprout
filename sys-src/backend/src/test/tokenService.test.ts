import tokenService from "./../utilities/tokenService";
import TokenService from "./../utilities/tokenService";


describe('TokenService class Test', () => {

    test('Verify if a generated Token is valid', () => {
        let tokenString = 'testToken'
        let token = tokenService.generateAuthToken(tokenString)
        expect(tokenService.verify(token).info).toBe(tokenString)
    })

    test('Verify if a generated Token is not valid', () => {
        expect(tokenService.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaW5mbyI6Im5vdF9vdXJfand0IiwiaWF0IjoxNTE2MjM5MDIyfQ.AQNpY4tvjdjgw0J6EMd0aLgT_8k1U-Mre1VTTIuGsOg')).toBe(null)
    })
    

    test('Verify if a generated Token is not valid', () => {
        let tokenString = 'testToken'
        let token = tokenService.generateAuthToken(tokenString)
        expect(tokenService.decode(token).info).toBe(tokenString)
    })
})