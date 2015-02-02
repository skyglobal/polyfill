# Contributing

Like most open source projects, we ask that you fork the project and issue a [pull request](#pull-requests) with your changes.

We encourage small change pull requests, the smaller the change the quicker and easier it is merged.

## Dependencies

To build the toolkit locally, you'll need to install:
 * [node.js](http://nodejs.org),
 * [Gulp](http://gulpjs.com),
 * [Bower](http://bower.io)


## Workflow

1. Fork the project
2. Clone down your fork
`git clone git://github.com/<username>/polyfill.git`
3. Setup your 'upstream'
`git remote add upstream https://github.com/skyglobal/polyfill.git`
4. Create a topic branch to contain your change
`git checkout -b feature-my-feature`
5. Place any new polyfills into [src](/src)
6. Make sure [CHANGELOG.md](./CHANGELOG.md) includes a summary of your changes in a new version number heading
7. Make sure you are still up to date with master
`git pull upstream master`
8. If necessary, rebase your commits into logical chunks, without errors.
9. Push the branch up 
`git push origin my-awesome-feature`
10. Create a pull request and describe what your change does and the why you think it should be merged.

If you would like the feature to go live sooner, mention this in the comments/commit. We will provide a temporary live url that will allow you to carry on without getting blocked.

## Running Locally

 * `gulp serve` :  Run server on port 3456

## Test Your Changes

 * `gulp test` : Run the tests once and produce a code coverage report

## Working with dependencies

If you want to make changes to the bower dependencies, you can clone them down from [here](http://github.com/skyglobal) and do the following.

 * `cd some-bower-dependency/`
 * `bower link`
 * `cd {{ component }}/`
 * `bower link some-bower-dependency`

## Releasing (admin only)

`gulp release`

This will automatically bump the 'patch' section of the version number.  

To bump a different area of the version number you can also use `major|minor|patch|prerelease` e.g. :

`gulp release --version=prerelease`