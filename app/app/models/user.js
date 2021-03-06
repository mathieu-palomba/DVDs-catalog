/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    SALT_WORK_FACTOR = 10;

/**
 * The User Preferences Schema.
 */
var userPreferencesSchema = new mongoose.Schema({
    backgroundPath: {
        type: String,
        default: ''
    }
});

/**
 * The User Schema.
 */
var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    preferences: [userPreferencesSchema]
});

/**
 * Bcrypt middleware.
 */
userSchema.pre('save', function(next) {
    var user = this;

    if(!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if(err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if(err) {
                return next(err);
            }

            user.password = hash;
            next();
        });
    });
});

/**
 * Password verification.
 * @param candidatePassword : The password to check
 * @param cb : Function
 */
userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if(err) {
            return cb(err);
        }

        cb(null, isMatch);
    });
};

var UserPreferences = mongoose.model('UserPreferences', userPreferencesSchema);
var User = mongoose.model('User', userSchema);