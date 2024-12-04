class UserPage{
    get logoutBtn (){
        return cy.get('a[href="logout.htm"]', { timeout: 1000 })
    } ;

}

export default new UserPage 