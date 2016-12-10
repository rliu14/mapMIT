/* Lead author: Casey */

var assert = require("assert");
var mongoose = require("mongoose");
var User = require("../models/User.js");

describe("App", function() {
    // The mongoose connection object
    var con;

    // Before running any tests, connect to mapmit database
    before(function(done) {
        con = mongoose.connect("mongodb://localhost/mapmitTest", function() {
            done();
        });
    });

    // Delete the database before each test.
    beforeEach(function(done) {
        con.connection.db.dropDatabase(function() {
            var content = [
                {fullname: 'Ben Bitdiddle', email: 'bbitdiddle@mit.edu', password: 'password12' },
                ];
            User.create(content[0], function(err, user) {
                done();
            });
        });
    });

    describe("User", function() {
    	it("should find users by email", function(done) {
    		User.findUser('bbitdiddle@mit.edu', function(err, foundUser) {
    			assert.notEqual(foundUser, undefined);
    			assert.equal(foundUser.fullname, 'Ben Bitdiddle');
    			assert.equal(foundUser.email, 'bbitdiddle@mit.edu');
    			assert.equal(foundUser.password, 'password12');
    			done();
    		});
    	});

    	it("should fail to find a user with a non-existent email", function(done) {
    		User.findUser('renaliu@mit.edu', function(err, foundUser) {
    			assert.equal(foundUser, undefined);
    			done();
    		});
    	});

    	it("should create a user with all valid inputs", function(done) {
    		User.createUser('Elysa Kohrs', 'ekohrs@mit.edu', 'password123', function(err, createdUser) {
                assert.notEqual(createdUser, undefined);
    			assert.equal(createdUser.fullname, 'Elysa Kohrs');
    			assert.equal(createdUser.email, 'ekohrs@mit.edu');
    			done();
    		});
    	});

    	it("should fail to create a user with a non-MIT email", function(done) {
    		User.createUser('Casey Hong', 'imposter@imposter.edu', 'password123', function(err, createdUser) {
    			assert.equal(createdUser, undefined);
    			done();
    		});
    	});

    	it("should fail to create a user with a password that is too short", function(done) {
    		User.createUser('Dora Tzeng', 'dtzeng@mit.edu', 'pw', function(err, createdUser) {
    			assert.equal(createdUser, undefined);
    			done();
    		});
    	});

    	it("should fail to create a user with a password that is too long", function(done) {
    		User.createUser('Rena Liu', 'rliu14@mit.edu', 'abcdefghijklmnopqrs', function(err, createdUser) {
    			assert.equal(createdUser, undefined);
    			done();
    		});
    	});

    	it("should fail to create a user with a password that contains non-alphanumeric characters", function(done) {
    		User.createUser('Elysa Kohrs', 'ekohrs@mit.edu', 'password!', function(err, createdUser) {
    			assert.equal(createdUser, undefined);
    			done();
    		});
    	});

        // TODO Fix This!!
    	it("should authorize a valid user with the correct password", function(done) {
            User.createUser('Casey Hong', 'jhong47@mit.edu', 'supersecretpw', function(err, createdUser) {
                var pw = createdUser.password;
                User.authUser('jhong47@mit.edu', pw, function(err, authorizedUser) {
                    assert.notEqual(authorizedUser, undefined);
                    assert.equal(authorizedUser.email, 'jhong47@mit.edu');
                    done();
                })
            });
    	});

        it("should fail to authorize a valid user with the incorrect password", function(done) {
            User.authUser('bbitdiddle@mit.edu', 'wrongpassword', function(err, authorizedUser) {
                assert.equal(authorizedUser, undefined);
                done();
            });
        });

        it("should fail to authorize a non-existent user", function(done) {
            User.authUser('jhong47@mit.edu', 'somepassword', function(err, authorizedUser) {
                assert.equal(authorizedUser, undefined);
                done();
            });
        });
    });
});