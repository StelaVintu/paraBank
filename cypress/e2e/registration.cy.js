import { faker } from '@faker-js/faker';
import RegistrationPage from '../fixtures/POM/registration.page'
import UserPage from '../fixtures/POM/user.page'

let userData; 

const generateUserData = (isComplete = true) => ({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: isComplete ? faker.location.zipCode() : '', 
    phoneNumber: isComplete ? faker.phone.number('##########') : '', 
    ssn: isComplete ? faker.string.numeric(9) : '', 
    username: faker.internet.userName(),
    password: faker.internet.password()
});
  
describe('Registration', () => {
    beforeEach(() => {
        userData = generateUserData();
        cy.visit("/parabank/register.htm");
    });

    it('Should not register new account with blank form', () => { 
        RegistrationPage.submitForm();
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
        RegistrationPage.fillRegistrationForm(userData);
        RegistrationPage.submitForm();
        RegistrationPage.successMessagePanel.should('contain.text', 'Your account was created successfully. You are now logged in.');
    });

    it('Should not register account with existing username', () => { 
        // Recreate a user with the same username for conflict
        RegistrationPage.fillRegistrationForm(userData);
        RegistrationPage.submitForm();
        // Attempt to register again with the same username
        UserPage.logoutBtn.should('be.visible').click();
        RegistrationPage.registerBtn.click();
        RegistrationPage.fillRegistrationForm(userData); // Refill with the same data
        RegistrationPage.submitForm();
        RegistrationPage.userNameError.should('be.visible').and('contain.text', 'This username already exists.');
    });
});
