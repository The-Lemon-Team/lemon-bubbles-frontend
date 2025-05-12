import { faker } from '@faker-js/faker';

import { generateNoteObjects } from '../../src/modules/common/utils/authTransport/dev/notes.mock';

import { ISignUpForm, INoteObj } from '../../src/interfaces';

const generateUserJson = (): ISignUpForm => {
  const password = faker.internet.password();

  return {
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password,
    repeatedPassword: password,
  };
};
const SITE_URL = 'http://localhost:5173';
const BOARD_URL = SITE_URL + '/board';
const AUTH_PATH = SITE_URL + '/auth';
const SIGN_UP_URL = AUTH_PATH + '/sign-up';

function openSite() {
  cy.visit(SITE_URL);
}

function saveUsers(data: ReturnType<typeof generateUserJson>) {
  cy.fixture('./users.json').then((users) => {
    const json = JSON.stringify([...users, data]);

    try {
      cy.writeFile('./cypress/fixtures/users.json', json, 'utf8');
    } catch (e) {
      console.error(e);
    }
  });
}

function createUser(data: ReturnType<typeof generateUserJson>) {
  cy.get('[data-testid="email"]').type(data.email);
  cy.get('[data-testid="username"]').type(data.username);
  cy.get('[data-testid="password"]').type(data.password);
  cy.get('[data-testid="repeatedPassword"]').type(data.repeatedPassword);

  cy.get('[data-testid="registrationBtn"]').click();
}

function login(data: { email: string; password: string }) {
  cy.get('[data-testid="email"]').type(data.email);
  cy.get('[data-testid="password"]').type(data.password);
  cy.get('[data-testid="login"]').click();
}

function openAddPopup() {
  cy.get('[data-testid="addButton"]').click();
}

function addNote(note: INoteObj) {
  openAddPopup();

  const createNoteModal = cy.get('[data-testid="createNoteModal"]');

  createNoteModal.get('[data-testid="titleInput"]').type(note.title);
  createNoteModal
    .get('[data-testid="descriptionInput"]')
    .click()
    .type(note.description);
  createNoteModal.get('[data-testid="submitBtn"]').click();
}

describe('login tests', () => {
  const userData = generateUserJson();

  it('registration', () => {
    cy.visit(SIGN_UP_URL);
    createUser(userData);
    saveUsers(userData);

    cy.wait(2000);
    cy.url().should('eq', BOARD_URL);
  });

  describe('login and add notes', () => {
    it('login', () => {
      cy.visit(AUTH_PATH);

      login(userData);

      const notes = generateNoteObjects(30);

      notes.forEach((note) => {
        addNote({
          title: note.title,
          description: note.description,
        });
      });
    });
  });
});
