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

groupSchema.statics.createGroup = function(content, cb) {
    var username = content.creator;
    var Group = this;
    User.findUser(username, function(err, creator) {
        if (err) {
            cb({ msg: err });
        } else {
            content.creator = creator;
            content.members = [creator];
            Group.create(content, cb);
        };
    });    
};

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

groupSchema.statics.findGroupAndAddMember = function(groupId, newMember, cb) {
    this.findById(groupId, function(err, group) {
        if (err) {
            cb({ msg: err });
        } else {
            User.findUser(newMember, function(err, user) {
                if (err) {
                    cb({ msg: err });
                } else {
                    group.members.push(user);
                    group.save(cb);
                };
            });
        };
    });
}

groupSchema.statics.findGroupAndRemoveMember = function(groupId, member, cb) {
    this.findById(groupId, function(err, group) {
        if (err) {
            cb({ msg: err });
        } else {
            User.findUser(member, function(err, user) {
                if (err) {
                    cb({ msg: err });
                } else {
                    group.members.pull(user);
                    group.save(cb);
                };
            });
        };
    });
}

module.exports = mongoose.model('Group', groupSchema)
