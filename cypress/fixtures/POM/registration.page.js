class RegistrationPage{
    get registerBtn(){
        return cy.get('a[href*="register"]')
    }
    get submitBtn(){
        return cy.get('td input[type="submit"]')
    }
    get errorMessage(){
        return cy.get('.error')
    }
    get firstNameInput(){
        return cy.get('input[id="customer.firstName"]')
    }
    get lastNameInput (){
        return cy.get('[id="customer.lastName"]')
    }
    get addressInput(){
        return cy.get('[id="customer.address.street"]')
    }
    get cityInput(){
        return cy.get('[id="customer.address.city"]')
    }
    get stateInput(){
        return cy.get('[id="customer.address.state"]')
    }
    get zipCodeInput(){
        return cy.get('[id="customer.address.zipCode"]')
    }
    get phoneNumberInput(){
        return cy.get('[id="customer.phoneNumber"]')
    }
    get ssnInput(){
        return cy.get('[id="customer.ssn"]')
    }
    get userNameInput(){
        return cy.get('[id="customer.username"]')
    }
    get passwordInput(){
        return cy.get('[id="customer.password"]')
    }
    get repeatedPasswordInput(){
        return cy.get('[id="repeatedPassword"]')
    }
    get successMessagePanel(){
        return cy.get('[id="rightPanel"]')
    }
    get userNameError(){
        return cy.get('[id="customer.username.errors"]')
    }
    get registerBtn (){
        return cy.get('a[href="register.htm"]')
    }

    fillRegistrationForm(userData) {
        if (userData.firstName) this.firstNameInput.type(userData.firstName);
        if (userData.lastName) this.lastNameInput.type(userData.lastName);
        if (userData.street) this.addressInput.type(userData.street);
        if (userData.city) this.cityInput.type(userData.city);
        if (userData.state) this.stateInput.type(userData.state);
        if (userData.zipCode) this.zipCodeInput.type(userData.zipCode);
        if (userData.phoneNumber) this.phoneNumberInput.type(userData.phoneNumber);
        if (userData.ssn) this.ssnInput.type(userData.ssn);
        if (userData.username) this.userNameInput.type(userData.username);
        if (userData.password) {
            this.passwordInput.type(userData.password);
            this.repeatedPasswordInput.type(userData.password);
        }
    }

    // Helper method to submit the registration form
    submitForm() {
        this.submitBtn.click();
    }

}

export default new RegistrationPage