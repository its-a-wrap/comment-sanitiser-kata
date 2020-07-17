import chai from 'chai';
import { CommentSanitiser } from './index.js';

const { expect } = chai;

describe('GIVEN CommentSanitiser class', () => {
  const commentSanitiser = new CommentSanitiser();
  describe('GIVEN an empty input string', () => {
    it('SHOULD return an empty string', () => {
      const inputString = '';
      expect(commentSanitiser.sanitise(inputString)).to.be.eql('');
    });
  });

  describe('GIVEN an input string `James was a crap builder and an idiot`', () => {
    it('SHOULD replace swear words with *s matching to word length', () => {
      const inputString = 'James was a crap builder and an idiot';
      expect(commentSanitiser.sanitise(inputString)).to.be.eql('James was a **** builder and an *****');
    });
  });

  describe('GIVEN an input string `James was a CRAP builder and an IDIOT`', () => {
    it('SHOULD replace swear words with *s matching to word length', () => {
      const inputString = 'James was a CRAP builder and an IDIOT';
      expect(commentSanitiser.sanitise(inputString)).to.be.eql('James was a **** builder and an *****');
    });
  });

  describe('GIVEN an input string `James has an email of james@hello.com`', () => {
    it('SHOULD replace swear words with *s matching to word length', () => {
      const inputString = 'James has an email of james@hello.com';
      expect(commentSanitiser.sanitise(inputString)).to.be.eql('James has an email of <email address>');
    });
  });

  describe('GIVEN an input string `James has an email of james@hello.co.uk`', () => {
    it('SHOULD replace swear words with *s matching to word length', () => {
      const inputString = 'James has an email of james@hello.co.uk';
      expect(commentSanitiser.sanitise(inputString)).to.be.eql('James has an email of <email address>');
    });
  });

  // describe('GIVEN an input string `James has an email of patrick.tweed@hello.co.uk`', () => {
  //   it('SHOULD replace swear words with *s matching to word length', () => {
  //     const inputString = 'James has an email of patrick.tweed@hello.co.uk.';
  //     expect(commentSanitiser.sanitise(inputString)).to.be.eql('James has an email of <email address>.');
  //   });
  // });

  describe('GIVEN an input string `James has an email of patrick.tweed@hello.co.uk`', () => {
    it('SHOULD replace swear words with *s matching to word length', () => {
      const inputString = 'patrick.tweed@hello.co.uk patrick.tweed@hello.co.uk patrick.tweed@hello.co.uk patrick.tweed@hello.co.uk';
      expect(commentSanitiser.sanitise(inputString)).to.be.eql('<email address> <email address> <email address> <email address>');
    });
  });

  describe('GIVEN an input string `James has a phone number of 07801567876`', () => {
    it('SHOULD replace swear words with *s matching to word length', () => {
      const inputString = 'James has a phone number of 07801567876';
      expect(commentSanitiser.sanitise(inputString)).to.be.eql('James has a phone number of <phone number>');
    });
  });

  describe('GIVEN an input string `James has a phone number of 07801567876 and an email address of patrick.tweed@hello.com crap and IDIOT`', () => {
    it('SHOULD replace swear words with *s matching to word length, phone numbers and email addresses', () => {
      const inputString = 'James has a phone number of 07801567876 and an email address of patrick.tweed@hello.com crap and IDIOT';
      expect(commentSanitiser.sanitise(inputString)).to.be.eql('James has a phone number of <phone number> and an email address of <email address> **** and *****');
    });
  });
});
