/* Lead author: Elysa */

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var User = require("./User.js");

/* Schema to represent the Group model */
var groupSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true, required: true },
    creator: { type: ObjectId, ref: 'User', required: true },
    members: [{ type: ObjectId, ref: 'User' }]
});

/**
 * Creates a group in the groups collection.
 * 
 * @param {Object} content The information needed to create a group,
 *      content is in the format - {
 *          name: {String},
 *          creator: {String} email address of user
 *      }
 * @param {Function} cb The callback function to execute, of the
 *      format cb(err, group).
 */
groupSchema.statics.createGroup = function(content, cb) {
    var email = content.creator;
    var Group = this;
    User.findUser(email, function(err, creator) {
        if (err) {
            cb({ msg: err });
        } else {
            content.creator = creator;
            content.members = [creator];
            Group.create(content, cb);
        };
    });    
};

/**
 * Gets groups created by a certain user.
 * 
 * @param {String} groupCreator The email address of the desired
 *      creator of the group
 * @param {Function} cb The callback function to execute, of the
 *      format cb(err, groups).
 */
groupSchema.statics.getGroupsByCreator = function(groupCreator, cb) {
    var Group = this;
    User.findUser(groupCreator, function(err, user) {
        if (err) {
            cb({ msg: err });
        } else {
            Group.find({ creator: user }).populate('members').exec(function(err, groups) {
                if (err) {
                    cb({ msg: err });
                } else {
                    cb(err, groups);
                };
            });
        };
    });
}

/**
 * Gets groups that contain a certain member. Includes groups 
 * where the given user is the creator of the group.
 * 
 * @param {String} groupCreator The email address of the desired
 *      member of the group.
 * @param {Function} cb The callback function to execute, of the
 *      format cb(err, groups).
 */
groupSchema.statics.getGroupsWithMember = function(groupMember, cb) {
    var Group = this;
    User.findUser(groupMember, function(err, user) {
        if (err) {
            cb({ msg: err });
        } else {
            Group.find({ members: user }).populate('members').exec(function(err, groups) {
                if (err) {
                    cb({ msg: err });
                } else {
                    cb(err, groups);
                };
            });
        };
    });
}

/**
 * Gets groups that contain a certain member. Excludes groups 
 * where the given user is the creator of the group.
 * 
 * @param {String} groupCreator The email address of the desired
 *      creator of the group.
 * @param {Function} cb The callback function to execute, of the
 *      format cb(err, groups).
 */
groupSchema.statics.getGroupsWithMemberNotCreator = function(groupMember, cb) {
    var Group = this;
    User.findUser(groupMember, function(err, user) {
        if (err) {
            cb({ msg: err });
        } else {
            Group.find({ members: user, creator: {$ne: user}}).populate('members').exec(function(err, groups) {
                if (err) {
                    cb({ msg: err });
                } else {
                    cb(err, groups);
                };
            });
        };
    });
}

/**
 * Finds a group and adds a member to that group.
 * 
 * @param {String} groupId The ObjectId of the group.
 * @param {String} newMember The email address of the user to
 *      add to the group.
 * @param {Function} cb The callback function to execute, of the
 *      format cb(err, groups).
 */
groupSchema.statics.findGroupAndAddMember = function(groupId, newMember, cb) {
    this.findById(groupId).exec(function(err, group) {
        if (err) {
            cb(err);
        } else {
            User.findUser(newMember, function(err, user) {
                if (err) {
                    cb(err);
                } else {
                    var added = group.members.addToSet(user);
                    group.save(function(err, group) {
                        if (err) {
                            cb(err);
                        } else if (added.length === 0) {
                            cb({ msg: 'User already in group!' });
                        } else {
                            group.populate('members', cb);
                        }
                    });
                };
            });
        };
    });
}

/**
 * Finds a group and removes a member from that group.
 * 
 * @param {String} groupId The ObjectId of the group.
 * @param {String} newMember The email address of the user to
 *      remove from that group.
 * @param {Function} cb The callback function to execute, of the
 *      format cb(err, groups).
 */
groupSchema.statics.findGroupAndRemoveMember = function(groupId, member, cb) {
    console.log('findGroupAndRemoveMember');
    console.log(groupId);
    console.log(member);
    this.findById(groupId, function(err, group) {
        console.log('group');
        console.log(group);
        if (err) {
            cb({ msg: err });
        } else {
            User.findUser(member, function(err, user) {
                console.log('err');
                console.log(err);
                if (err) {
                    cb({ msg: err });
                } else {
                    console.log('user');
                    console.log(user);
                    console.log('group.members');
                    console.log(group.members);
                    if (group.creator._id === user._id) {
                        // Throw error if try to remove creator of group
                        cb({ msg: 'Cannot remove creator!' });
                    }
                    else if (group.members.indexOf(user._id) === -1) {
                        cb({ msg: 'User not in group!' });
                    } else {
                        group.members.pull(user);
                        group.save(cb);
                    }
                };
            });
        };
    });
}

module.exports = mongoose.model('Group', groupSchema)
