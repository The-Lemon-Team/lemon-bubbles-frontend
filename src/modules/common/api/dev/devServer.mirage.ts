// import { belongsTo, createServer, Factory, hasMany, Model } from 'miragejs';
// import { faker } from '@faker-js/faker';
// import { size, shuffle } from 'lodash';

// import { colorGenerator } from '../../../hashtags/utils/colorGenerator';

// import { IHashTag, INote } from '../../../../interfaces';

// const hashTags = generateWord(30);

// const notes = [
//   {
//     title: generateWord(2).join(' '),
//     description: generateWord(3).join(' '),
//   },
// ] as Partial<INote>;

export const setupMirage = () => {};

// export const setupDevServer = () => {
//   createServer({
//     namespace: 'api',
//     models: {
//       note: Model.extend({
//         hashTags: hasMany('hashTag'),
//       }),
//       hashTag: Model,
//     },
//     factories: {
//       note: Factory.extend({
//         created: new Date().toString(),
//         title: (i) => `Title #${i}`,
//         description: (i) => `Description #${i}`,
//       }),
//       hashTag: Factory.extend({
//         color: () => colorGenerator(),
//         text: () => generateWord(1).join(' '),
//         created: () => new Date().toString(),
//       }),
//     },
//     seeds(server) {
//       //   server.create('hashTag', {
//       //     color: colorGenerator(),
//       //     text: generateWord(1).join(' '),
//       //     create: new Date().toString(),
//       //   });
//       const tags = server.createList('hashTag', 3);
//       server.create('note', { hashTags: tags });
//     },
//     routes() {
//       this.get('/notes', (schema) => {
//         const hashTags = schema.all('hashTag');
//         const notes = schema.all('note');

//         console.log(notes, hashTags);

//         return notes;
//       });
//     },
//   });
// };
