class UserPage{
    get logoutBtn (){
        return cy.get('a[href="logout.htm"]')
    } ;

}

export default new UserPage 