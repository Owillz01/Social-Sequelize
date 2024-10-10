const { Comment, Like, Post, Profile, User } = require("./index");
const { db } = require('./db/connection.js');
const users = require("./seed/users.json");
const posts = require("./seed/posts.json");
const likes = require("./seed/likes.json");
const comments = require("./seed/comments.json");
const profiles = require("./seed/profiles.json");

describe('Social Sequelzie Test', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the test suite is run
        await db.sync({ force: true });
    })
    
    // Write your tests here
    
    test("can create a User test", async function() {
        await User.bulkCreate(users);
        let user = await User.findByPk(1)
        expect(user).toEqual(
          expect.objectContaining(users[0])
        );
    })

    test("can create a Profile", async function () {
        await Profile.bulkCreate(profiles);
      let profile = await Profile.findByPk(1);
      expect(profile).toEqual(expect.objectContaining(profiles[0]));
    });

       test("can create a Post", async function () {
         await Post.bulkCreate(posts);
         let post = await Post.findByPk(1);
         expect(post).toEqual(expect.objectContaining(posts[0]));
       });
    
        test("can create a Comment", async function () {
          await Comment.bulkCreate(comments);
          let comment = await Comment.findByPk(1);
          expect(comment).toEqual(expect.objectContaining(comments[0]));
        });


     test("can create a Like", async function () {
       await Like.bulkCreate(likes);
       let like = await Like.findByPk(1);
       expect(like).toEqual(expect.objectContaining(likes[0]));
     });

     test('user can have single profile', async () => {
        let user = await User.create(users[0]);
        let profile = await Profile.create(profiles[0]);

        await user.setProfile(profile)
        const _profile = await user.getProfile()

        expect(_profile).toBeInstanceOf(Profile);

     })

      test("user can have many likes", async () => {
        let user = await User.create(users[0]);
        let firstLike = await Like.create(likes[0]);
        let secondLike = await Like.create(likes[1]);

        await user.addLikes([firstLike, secondLike]);
        const _likes = await user.getLikes();

        expect(_likes[0]).toBeInstanceOf(Like);
      });


      test("likes can be associated to many users", async () => {
          await User.bulkCreate(users);
        let _users = await User.findAll()
        let firstLike = await Like.create(likes[0]);
        await firstLike.addUsers(_users)
        let usersLiked = await firstLike.getUsers()

        expect(usersLiked[0]).toBeInstanceOf(User);
      });


})