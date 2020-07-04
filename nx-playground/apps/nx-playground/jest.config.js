module.exports = {
  name: 'nx-playground',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/nx-playground',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
