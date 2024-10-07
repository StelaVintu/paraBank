import { faker } from '@faker-js/faker';
import RegistrationPage from '../fixtures/POM/registration.page'

let existingUserData; 

const generateUserData = (isComplete = true) => ({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: isComplete ? faker.location.zipCode() : '', // Conditionally include zipCode
    phoneNumber: isComplete ? faker.phone.number('##########') : '', // Conditionally include phoneNumber
    ssn: isComplete ? faker.string.numeric(9) : '', // Conditionally include SSN
    username: faker.internet.userName(),
    password: faker.internet.password()
});
  
describe('Registration', () => {
    beforeEach(() => {
        cy.visit("/parabank/register.htm");
    });

    it('Should not register new account with blank form', () => { 
        RegistrationPage.submitBtn.click();
        RegistrationPage.errorMessage.should('be.visible');
        cy.url().should('include', '/register'); 
    });

    it('Should not register new account with incomplete form', () => { 
        const incompleteUserData = generateUserData(false); 
        RegistrationPage.fillRegistrationForm(incompleteUserData);
        RegistrationPage.submitForm();
        RegistrationPage.errorMessage.should('be.visible');
        cy.url().should('include', '/register'); 
    });

    it('Should register new account after completed form', () => { 
        existingUserData = generateUserData(); 
        RegistrationPage.fillRegistrationForm(existingUserData);
        RegistrationPage.submitForm();
        RegistrationPage.successMessagePanel.should('contain.text', 'Your account was created successfully. You are now logged in.');
    });

    it('Should not register account with existing username', () => { 
        expect(existingUserData).to.not.be.undefined; 
        expect(existingUserData.username).to.not.be.undefined; 
        RegistrationPage.fillRegistrationForm(existingUserData);
        RegistrationPage.submitForm();
        RegistrationPage.userNameError.should('be.visible').and('contain.text', 'This username already exists.');
    });
});