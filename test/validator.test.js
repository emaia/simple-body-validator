const assert = require('assert');
const SimpleValidator = require('../lib/index').default;

const validator = SimpleValidator.make();

describe('Array', function() {
    describe('The field under validation must be an array', function() {
      it('Validation should fail in case value is not an array', function() {
          
        validator.setData({ value: 'test' }).setRules({ value: 'array' });
        assert.equal(validator.validate(), false);

        validator.setData({ value: 2 });
        assert.equal(validator.validate(), false);

        validator.setData({ value: { name: 'test' }});
        assert.equal(validator.validate(), false);

      });
      it('An Error Message should be returned in case of failure', function() {
            assert.equal(validator.firstError(), 'The value must be an array.');
      });
      it('Validation should succeed in case value is an array', function() {
            validator.setData({ value: [] });
            assert.ok(validator.validate());
      });
    });
});

describe('Alpha', function() {
  describe('The field under validation must be entirely alphabetic characters', function() {
    it('Validation should fail in case value does not only contain alphabetic characters', function () {

      validator.setData({ value: 'test1234'}).setRules({ value: 'alpha' });
      assert.equal(validator.validate(), false);

      validator.setData({ value: '$^(' });
      assert.equal(validator.validate(), false);

    });
    it('An Error Message should be returned in case of failure', function() {
        assert.equal(validator.firstError(), 'The value must only contain letters.');
    });
    it('Validation should succeed in case value contain only alphabetic characters', function() {
        validator.setData({ value: 'test' });
        assert.ok(validator.validate());
    });
  });
});

describe('AlphaDash', function() {
  describe('The field under validation may have alpha-numeric characters, as well as dashes and underscores', function() {
    it('Validation should fail in case value does not only contain alpha-numeric characters, dashes and underscores', function () {

      validator.setData({ value: 'test_$2'}).setRules({ value: 'alpha_dash' });
      assert.equal(validator.validate(), false);

      validator.setData({ value: '$^(' });
      assert.equal(validator.validate(), false);

    });
    it('An Error Message should be returned in case of failure', function() {
        assert.equal(validator.firstError(), 'The value must only contain letters, numbers, dashes and underscores.');
    });
    it('Validation should succeed in case value contain only alphabetic characters', function() {
        validator.setData({ value: 'test_test-test12' });
        assert.ok(validator.validate());
    });
  });
});

describe('AlphaNum', function() {
  describe('The field under validation must be entirely alpha-numeric characters.', function() {
    it('Validation should fail in case value does not only contain alpha-numeric characters', function () {

      validator.setData({ value: 'test_$2'}).setRules({ value: 'alpha_num' });
      assert.equal(validator.validate(), false);

    });
    it('An Error Message should be returned in case of failure', function() {
        assert.equal(validator.firstError(), 'The value must only contain letters and numbers.');
    });
    it('Validation should succeed in case value contain only alphabetic characters', function() {
        validator.setData({ value: 'test123' });
        assert.ok(validator.validate());
    });
  });
});

describe('Boolean', function() {
  describe('The field under validation must be a boolean', function() {
    it('Validation should fail in case value is not boolean', function() {
      validator.setData({ value: 'test' }).setRules({ value: 'boolean' });
      assert.equal(validator.validate(), false);
    });
    it('An Error Message should be returned in case of failure', function() {
       assert.equal(validator.firstError(), 'The value field must be true or false.');
    });
    it('Validation should succeed in case value is a boolean', function() {
      const validValues = [true, false, '0', '1', 0, 1];
      validValues.forEach(value => {
        validator.setData({ value });
        assert.ok(validator.validate());
      });
    });
  });
  describe('In case strict rule is used value should be either true or false', function() {
      it('Validation should fail in case 0 or 1 are used', function() {
         const values = [0, 1, '0', '1'];
         validator.setRules({ value: 'strict|boolean' });
         values.forEach(value => {
            validator.setData({ value });
            assert.equal(validator.validate(), false);
         });
      });
      it('Validation should succeed in case true or false are used', function() {
          validator.setData({ value: true });
          assert.ok(validator.validate());

          validator.setData({ value: false });
          assert.ok(validator.validate());
      });
  });
});

describe('Digits', function() {
  describe('The field under validation must be numeric and must have an exact length of value.', function () {
    it('Validation should fail if field under validation is not a number', function() {
      validator.setData({ value: 'test' }).setRules({ value: 'digits:4' });
      assert.equal(validator.validate(), false);

      validator.setData({ value: { name: 'test' }});
      assert.equal(validator.validate(), false);
    });
    it('Validation should fail if field under validation is decimal', function() {
      validator.setData({ value: 12.3 }).setData({ value: 2 });
      assert.equal(validator.validate(), false);
    });
    it('Validation should fail if number does not match the number of digits', function() {
      validator.setData({ value: 123 });
      assert.equal(validator.validate(), false);

      validator.setData({ value: 0123 });
      assert.equal(validator.validate(), false);

      validator.setData({ value: '012' });
      assert.equal(validator.validate(), false);
    });
    it('An Error message should be returned in case of failure', function() {
      assert.equal(validator.firstError(), 'The value must be 4 digits.');
    });
    it('Validation should succeed in case the number matches the specified the number of digits', function() {
      validator.setData({ value: 1234 });
      assert.ok(validator.validate());

      validator.setData({ value: '0123' });
      assert.ok(validator.validate());
    });
  });
  it('Validation rule digits requires 1 parameter', function() {
    validator.setRules({ value: 'digits' });

    try {
        validator.validate();
    } catch (e) {
        assert.equal(e, 'Validation rule digits requires at least 1 parameters.');
    }
  });
  it('Validation rule digits requires the parameter to be an integer', function() {
    validator.setRules({ value: 'digits: 1.3'});

    try {
      validator.validate();
    } catch (e) {
        assert.equal(e, 'Validation rule digits requires the parameter to be an integer.');
    }
  });
  it('Validation rule digits requires the parameter to be an integer greater than 0', function() {
    validator.setRules({ value: 'digits: -1'});
    try {
      validator.validate();
    } catch (e) {
        assert.equal(e, 'Validation rule digits requires the parameter to be an integer greater than 0.');
    }
  });
});