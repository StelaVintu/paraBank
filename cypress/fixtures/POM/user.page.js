class UserPage{
    get logoutBtn (){
        return cy.get('a[href="logout.htm"]', { timeout: 10000 })
    } ;

}

export default new UserPage 