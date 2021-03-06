import * as assert from 'assert';
import * as fs from 'fs';
import * as mockTimezone from 'timezone-mock';

import { OutputFormat } from '../src/output-format';

import * as utils from './../src/utils';
import * as yarle from './../src/yarle';
import * as dropTheRopeRunner from './../src/dropTheRopeRunner';
import { YarleOptions } from './../src/YarleOptions';

describe('dropTheRope ', async () => {
  before(() => {
    mockTimezone.register('Europe/London');
  });

  after(() => {
    mockTimezone.unregister();
  });

  afterEach(async () => {
    utils.clearMdNotesDistDir();
  });

  it('Empty enex file - throw eoent', async () => {
    let errorHappened = false;
    const options: YarleOptions = {
      enexFile: './test/data/do_not_exists.enex',
    };
    try {
      await yarle.dropTheRope(options);
    } catch (e) {
      errorHappened = true;
    }
    assert.equal(true, errorHappened);
  });

  it.skip('Enex file with note huge cell', async () => {
    const options: YarleOptions = {
      enexFile: './test/data/backgroundGenes.enex',
      outputDir: 'out',
      isMetadataNeeded: true,
    };
    await yarle.dropTheRope(options);
    assert.equal(
      fs.existsSync(
        `${__dirname}/../out/notes/test-justText/test -note with text only.md`,
      ),
      true,
    );
    assert.equal(
      fs.readFileSync(
        `${__dirname}/../out/notes/test-justText/test -note with text only.md`,
        'utf8',
      ),
      fs.readFileSync(`${__dirname}/data/test-justText.md`, 'utf8'),
    );
  });
  it('Enex file with note WithHyperlinkRefs', async () => {
    const options: YarleOptions = {
      enexFile: './test/data/test-bracketlinks.enex',
      outputDir: 'out',
      isMetadataNeeded: true,
    };
    await yarle.dropTheRope(options);
    assert.equal(
      fs.existsSync(
        `${__dirname}/../out/notes/test-bracketlinks/test - bracketlinks.md`,
      ),
      true,
    );
    assert.equal(
      fs.readFileSync(
        `${__dirname}/../out/notes/test-bracketlinks/test - bracketlinks.md`,
        'utf8',
      ),
      fs.readFileSync(`${__dirname}/data/test-bracketlinks.md`, 'utf8'),
    );
  });

  it('Enex file with note containing text only', async () => {
    const options: YarleOptions = {
      enexFile: './test/data/test-justText.enex',
      outputDir: 'out',
      isMetadataNeeded: true,
    };
    await yarle.dropTheRope(options);
    assert.equal(
      fs.existsSync(
        `${__dirname}/../out/notes/test-justText/test -note with text only.md`,
      ),
      true,
    );
    assert.equal(
      fs.readFileSync(
        `${__dirname}/../out/notes/test-justText/test -note with text only.md`,
        'utf8',
      ),
      fs.readFileSync(`${__dirname}/data/test-justText.md`, 'utf8'),
    );
  });

  it('Note with code block', async () => {
    const options: YarleOptions = {
      enexFile: './test/data/test-noteWithCodeBlock.enex',
      outputDir: 'out',
      isMetadataNeeded: true,
    };
    await yarle.dropTheRope(options);

    assert.equal(
      fs.existsSync(
        `${__dirname}/../out/notes/test-noteWithCodeBlock/note with code block.md`,
      ),
      true,
    );
    assert.equal(
      fs.readFileSync(
        `${__dirname}/../out/notes/test-noteWithCodeBlock/note with code block.md`,
        'utf8',
      ),
      fs.readFileSync(`${__dirname}/data/test-noteWithCodeBlock.md`, 'utf8'),
    );
  });

  it('Note with tags', async () => {
    const options: YarleOptions = {
      enexFile: './test/data/test-noteWithTags.enex',
      outputDir: 'out',
      isMetadataNeeded: true,
    };
    await yarle.dropTheRope(options);
    assert.equal(
      fs.existsSync(
        `${__dirname}/../out/notes/test-noteWithTags/test -note with text only.md`,
      ),
      true,
    );
    assert.equal(
      fs.readFileSync(
        `${__dirname}/../out/notes/test-noteWithTags/test -note with text only.md`,
        'utf8',
      ),
      fs.readFileSync(`${__dirname}/data/test-noteWithTags.md`, 'utf8'),
    );
  });

  it('Note with zettelkastel id', async () => {
    const options: YarleOptions = {
      enexFile: './test/data/test-noteWithZettelKasten.enex',
      outputDir: 'out',
      isMetadataNeeded: true,
      isZettelkastenNeeded: true,
    };
    await yarle.dropTheRope(options);
    assert.equal(
      fs.existsSync(
        `${__dirname}/../out/notes/test-noteWithZettelKasten/201810060943 test -note with text only.md`,
      ),
      true,
    );
    assert.equal(
      fs.readFileSync(
        `${__dirname}/../out/notes/test-noteWithZettelKasten/201810060943 test -note with text only.md`,
        'utf8',
      ),
      fs.readFileSync(`${__dirname}/data/test-noteWithZettelKasten.md`, 'utf8'),
    );
  });

  it('Note with zettelkastel id - no title', async () => {
    const options: YarleOptions = {
      enexFile: './test/data/test-noteWithZettelKasten-notitle.enex',
      outputDir: 'out',
      isMetadataNeeded: true,
      isZettelkastenNeeded: true,
    };
    await yarle.dropTheRope(options);
    assert.equal(
      fs.existsSync(
        `${__dirname}/../out/notes/test-noteWithZettelKasten-notitle/201810060943.md`,
      ),
      true,
    );
    assert.equal(
      fs.readFileSync(
        `${__dirname}/../out/notes/test-noteWithZettelKasten-notitle/201810060943.md`,
        'utf8',
      ),
      fs.readFileSync(
        `${__dirname}/data/test-noteWithZettelKasten-notitle.md`,
        'utf8',
      ),
    );
  });

  it('Note without metadata', async () => {
    const options: YarleOptions = {
      enexFile: './test/data/test-noteWithoutMetadata.enex',
      outputDir: 'out',
      isMetadataNeeded: false,
      isZettelkastenNeeded: false,
    };
    await yarle.dropTheRope(options);
    assert.equal(
      fs.existsSync(
        `${__dirname}/../out/notes/test-noteWithoutMetadata/test -note without metadata.md`,
      ),
      true,
    );
    assert.equal(
      fs.readFileSync(
        `${__dirname}/../out/notes/test-noteWithoutMetadata/test -note without metadata.md`,
        'utf8',
      ),
      fs.readFileSync(`${__dirname}/data/test-noteWithoutMetadata.md`, 'utf8'),
    );
  });

  it('Note with latlong', async () => {
    const options: YarleOptions = {
      enexFile: './test/data/test-noteWithLatLong.enex',
      outputDir: 'out',
      isMetadataNeeded: true,
    };
    await yarle.dropTheRope(options);
    assert.equal(
      fs.existsSync(
        `${__dirname}/../out/notes/test-noteWithLatLong/test.md`,
      ),
      true,
    );
    assert.equal(
      fs.readFileSync(
        `${__dirname}/../out/notes/test-noteWithLatLong/test.md`,
        'utf8',
      ),
      fs.readFileSync(`${__dirname}/data/test-noteWithLatLong.md`, 'utf8'),
    );
  });

  it('Enex file with note containing a picture', async () => {
    const options: YarleOptions = {
      enexFile: './test/data/test-withPicture.enex',
      outputDir: 'out',
      isMetadataNeeded: true,
    };
    await yarle.dropTheRope(options);
    assert.equal(
      fs.existsSync(
        `${__dirname}/../out/notes/test-withPicture/test - note with picture.md`,
      ),
      true,
    );
    assert.equal(
      fs.existsSync(
        `${__dirname}/../out/notes/test-withPicture/_resources/test_-_note_with_picture.resources`,
      ),
      true,
    );

    assert.equal(
      fs.readFileSync(
        `${__dirname}/../out/notes/test-withPicture/test - note with picture.md`,
        'utf8',
      ),
      fs.readFileSync(`${__dirname}/data/test-withPicture.md`, 'utf8'),
    );
  });

  it('Skips images without src attribute', async () => {
    const options: YarleOptions = {
      enexFile: './test/data/test-imageWithoutSrc.enex',
      outputDir: 'out',
      isMetadataNeeded: true,
    };

    await yarle.dropTheRope(options);

    assert.equal(
      fs.existsSync(
        `${__dirname}/../out/notes/test-imageWithoutSrc/test-imagewithoutsrc.md`,
      ),
      true,
    );
    assert.equal(
      fs.readFileSync(
        `${__dirname}/../out/notes/test-imageWithoutSrc/test-imagewithoutsrc.md`,
        'utf8',
      ),
      fs.readFileSync(`${__dirname}/data/test-imageWithoutSrc.md`, 'utf8'),
    );
  });

  it('Enex file with note containing text and picture', async () => {
    const options: YarleOptions = {
      enexFile: './test/data/test-textWithImage.enex',
      outputDir: 'out',
      isMetadataNeeded: true,
    };
    await yarle.dropTheRope(options);
    assert.equal(
      fs.existsSync(
        `${__dirname}/../out/notes/test-textWithImage/untitled.md`,
      ),
      true,
    );
    assert.equal(
      fs.existsSync(
        `${__dirname}/../out/notes/test-textWithImage/_resources/untitled.resources`,
      ),
      true,
    );

    assert.equal(
      fs.readFileSync(
        `${__dirname}/../out/notes//test-textWithImage/untitled.md`,
        'utf8',
      ),
      fs.readFileSync(`${__dirname}/data/test-textWithImage.md`, 'utf8'),
    );
  });

  it('Enex file with multiple notes', async () => {
    const options: YarleOptions = {
      enexFile: './test/data/test-twoNotes.enex',
      outputDir: 'out',
      isMetadataNeeded: true,
    };
    await yarle.dropTheRope(options);
    assert.equal(
      fs.existsSync(
        `${__dirname}/../out/notes/test-twoNotes/test - note with picture.md`,
      ),
      true,
    );
    assert.equal(
      fs.existsSync(
        `${__dirname}/../out/notes/test-twoNotes/_resources/test_-_note_with_picture.resources`,
      ),
      true,
    );

    assert.equal(
      fs.readFileSync(
        `${__dirname}/../out/notes/test-twoNotes/test - note with picture.md`,
        'utf8',
      ),
      fs.readFileSync(`${__dirname}/data/test-twoNotes-pic.md`, 'utf8'),
    );
    assert.equal(
      fs.existsSync(
        `${__dirname}/../out/notes/test-twoNotes/test -note with text only.md`,
      ),
      true,
    );

    assert.equal(
      fs.readFileSync(
        `${__dirname}/../out/notes/test-twoNotes/test -note with text only.md`,
        'utf8',
      ),
      fs.readFileSync(`${__dirname}/data/test-twoNotes-text.md`, 'utf8'),
    );
  });

  it('Enex file with note containing more pictures', async () => {
    const options: YarleOptions = {
      enexFile: './test/data/test-threePictures.enex',
      outputDir: 'out',
      isMetadataNeeded: true,
    };
    await yarle.dropTheRope(options);
    assert.equal(
      fs.existsSync(
        `${__dirname}/../out/notes/test-threePictures/test - note with more pictures.md`,
      ),
      true,
    );
    assert.equal(
      fs.existsSync(
        `${__dirname}/../out/notes/test-threePictures/_resources/test_-_note_with_more_pictures.resources`,
      ),
      true,
    );

    assert.equal(
      fs.readFileSync(
        `${__dirname}/../out/notes/test-threePictures/test - note with more pictures.md`,
        'utf8',
      ),
      fs.readFileSync(`${__dirname}/data/test-threePictures.md`, 'utf8'),
    );
  });

  it('Enex file plaintextonly - skipping note that has resource in it', async () => {
    const options: YarleOptions = {
      enexFile: './test/data/test-threePictures.enex',
      outputDir: 'out',
      isMetadataNeeded: true,
      plainTextNotesOnly: true,
    };
    await yarle.dropTheRope(options);
    assert.equal(
      fs.existsSync(
        `${__dirname}/../out/notestest-threePictures//test - note with more pictures.md`,
      ),
      false,
    );
  });
  it('Enex file skip Location', async () => {
    const options: YarleOptions = {
      enexFile: './test/data/test-skipLocation.enex',
      outputDir: 'out',
      isMetadataNeeded: true,
      skipLocation: true,
    };
    await yarle.dropTheRope(options);
    assert.equal(
      fs.existsSync(
        `${__dirname}/../out/notes/test-skipLocation/skiplocation.md`,
      ),
      true,
    );
    assert.equal(
      fs.readFileSync(
        `${__dirname}/../out/notes/test-skipLocation/skiplocation.md`,
        'utf8',
      ),
      fs.readFileSync(`${__dirname}/data/test-skipLocation.md`, 'utf8'),
    );
  });
  it('Enex file with two notes with same names', async () => {
    const options: YarleOptions = {
      enexFile: './test/data/test-twoNotesWithSameName.enex',
      outputDir: 'out',
      isMetadataNeeded: true,
      plainTextNotesOnly: false,
      skipLocation: false,
    };
    await yarle.dropTheRope(options);
    assert.equal(
      fs.existsSync(
        `${__dirname}/../out/notes/test-twoNotesWithSameName/untitled.md`,
      ),
      true,
    );

    assert.equal(
      fs.readFileSync(
        `${__dirname}/../out/notes/test-twoNotesWithSameName/untitled.md`,
        'utf8',
      ),
      fs.readFileSync(`${__dirname}/data/test-twoNotesWithSameName.md`, 'utf8'),
    );

    assert.equal(
      fs.existsSync(
        `${__dirname}/../out/notes/test-twoNotesWithSameName/untitled.1.md`,
      ),
      true,
    );
    assert.equal(
      fs.readFileSync(
        `${__dirname}/../out/notes/test-twoNotesWithSameName/untitled.1.md`,
        'utf8',
      ),
      fs.readFileSync(
        `${__dirname}/data/test-twoNotesWithSameName.1.md`,
        'utf8',
      ),
    );
  });

  it('Enex file with table', async () => {
    const options: YarleOptions = {
      enexFile: './test/data/test-table.enex',
      outputDir: 'out',
      isMetadataNeeded: true,
      plainTextNotesOnly: false,
    };
    await yarle.dropTheRope(options);
    assert.equal(
      fs.existsSync(`${__dirname}/../out/notes/test-table/table.md`),
      true,
    );

    assert.equal(
      fs.readFileSync(
        `${__dirname}/../out/notes/test-table/table.md`,
        'utf8',
      ),
      fs.readFileSync(`${__dirname}/data/test-table.md`, 'utf8'),
    );
  });

  it('Enex file with specialItems', async () => {
    const options: YarleOptions = {
      enexFile: './test/data/test-specialItems.enex',
      outputDir: 'out',
      isMetadataNeeded: true,
      plainTextNotesOnly: false,
    };
    await yarle.dropTheRope(options);
    assert.equal(
      fs.existsSync(
        `${__dirname}/../out/notes/test-specialItems/special items.md`,
      ),
      true,
    );

    assert.equal(
      fs.readFileSync(
        `${__dirname}/../out/notes/test-specialItems/special items.md`,
        'utf8',
      ),
      fs.readFileSync(`${__dirname}/data/test-specialItems.md`, 'utf8'),
    );
  });

  it('Enex file with links ', async () => {
    const options: YarleOptions = {
      enexFile: './test/data/test-externalLink.enex',
      outputDir: 'out',
      isMetadataNeeded: true,
      plainTextNotesOnly: false,
    };
    await yarle.dropTheRope(options);
    assert.equal(
      fs.existsSync(
        `${__dirname}/../out/notes/test-externalLink/external link.md`,
      ),
      true,
    );

    assert.equal(
      fs.readFileSync(
        `${__dirname}/../out/notes/test-externalLink/external link.md`,
        'utf8',
      ),
      fs.readFileSync(`${__dirname}/data/test-externalLink.md`, 'utf8'),
    );
  });

  it('Enex file with file links ', async () => {
    const options: YarleOptions = {
      enexFile: './test/data/test-externalFileLink.enex',
      outputDir: 'out',
      isMetadataNeeded: true,
      plainTextNotesOnly: false,
    };
    await yarle.dropTheRope(options);
    assert.equal(
      fs.existsSync(
        `${__dirname}/../out/notes/test-externalFileLink/external file link.md`,
      ),
      true,
    );

    assert.equal(
      fs.readFileSync(
        `${__dirname}/../out/notes/test-externalFileLink/external file link.md`,
        'utf8',
      ),
      fs.readFileSync(`${__dirname}/data/test-externalFileLink.md`, 'utf8'),
    );
  });

  it('Enex file with links with resources', async () => {
    const options: YarleOptions = {
      enexFile: './test/data/test-externalLinkWithPicture.enex',
      outputDir: 'out',
      isMetadataNeeded: true,
      plainTextNotesOnly: false,
    };
    await yarle.dropTheRope(options);
    assert.equal(
      fs.existsSync(
        `${__dirname}/../out/notes/test-externalLinkWithPicture/link with picture.md`,
      ),
      true,
    );

    assert.equal(
      fs.readFileSync(
        `${__dirname}/../out/notes/test-externalLinkWithPicture/link with picture.md`,
        'utf8',
      ),
      fs.readFileSync(
        `${__dirname}/data/test-externalLinkWithPicture.md`,
        'utf8',
      ),
    );
  });

  it('Enex file with internal links ', async () => {
    const options: YarleOptions = {
      enexFile: './test/data/test-links.enex',
      outputDir: 'out',
      isMetadataNeeded: true,
      plainTextNotesOnly: false,
    };
    await yarle.dropTheRope(options);
    assert.equal(
      fs.existsSync(`${__dirname}/../out/notes/test-links/notea.md`),
      true,
    );

    assert.equal(
      fs.readFileSync(
        `${__dirname}/../out/notes/test-links/notea.md`,
        'utf8',
      ),
      fs.readFileSync(`${__dirname}/data/test-linksNoteA.md`, 'utf8'),
    );

    assert.equal(
      fs.existsSync(`${__dirname}/../out/notes/test-links/noteb.md`),
      true,
    );

    assert.equal(
      fs.readFileSync(
        `${__dirname}/../out/notes/test-links/noteb.md`,
        'utf8',
      ),
      fs.readFileSync(`${__dirname}/data/test-linksNoteB.md`, 'utf8'),
    );
  });

  it('Enex file with highlighted text', async () => {
    const options: YarleOptions = {
      enexFile: './test/data/test-highlights.enex',
      outputDir: 'out',
      isMetadataNeeded: true,
      plainTextNotesOnly: false,
    };
    await yarle.dropTheRope(options);
    assert.equal(
      fs.existsSync(
        `${__dirname}/../out/notes/test-highlights/highlights.md`,
      ),
      true,
    );

    assert.equal(
      fs.readFileSync(
        `${__dirname}/../out/notes/test-highlights/highlights.md`,
        'utf8',
      ),
      fs.readFileSync(`${__dirname}/data/test-highlights.md`, 'utf8'),
    );
  });
  it('Enex file with highlighted text - Obsidian-style', async () => {
    const options: YarleOptions = {
      enexFile: './test/data/test-highlights.enex',
      outputDir: 'out',
      isMetadataNeeded: true,
      plainTextNotesOnly: false,
      outputFormat: OutputFormat.ObsidianMD,
    };
    await yarle.dropTheRope(options);
    assert.equal(
      fs.existsSync(
        `${__dirname}/../out/notes/test-highlights/highlights.md`,
      ),
      true,
    );

    assert.equal(
      fs.readFileSync(
        `${__dirname}/../out/notes/test-highlights/highlights.md`,
        'utf8',
      ),
      fs.readFileSync(`${__dirname}/data/test-highlightsObsidian.md`, 'utf8'),
    );
  });
  it('Enex file with PDF attachment', async () => {
    const options: YarleOptions = {
      enexFile: './test/data/test-pdfAttachment.enex',
      outputDir: 'out',
      isMetadataNeeded: true,
      plainTextNotesOnly: false,
    };
    await yarle.dropTheRope(options);
    assert.equal(
      fs.existsSync(
        `${__dirname}/../out/notes/test-pdfAttachment/pdfattachment.md`,
      ),
      true,
    );
    assert.equal(
      fs.existsSync(
        `${__dirname}/../out/notes/test-pdfAttachment/_resources/pdfattachment.resources/sample.pdf`,
      ),
      true,
    );
  });

  it('Enex file obsidian style', async () => {
    const options: YarleOptions = {
      enexFile: './test/data/test-twoNotes.enex',
      outputDir: 'out',
      isMetadataNeeded: true,
      outputFormat: OutputFormat.ObsidianMD,
    };
    await yarle.dropTheRope(options);
    assert.equal(
      fs.existsSync(
        `${__dirname}/../out/notes/test-twoNotes/test - note with picture.md`,
      ),
      true,
    );
    assert.equal(
      fs.existsSync(
        `${__dirname}/../out/notes/test-twoNotes/_resources/test_-_note_with_picture.resources`,
      ),
      true,
    );

    assert.equal(
      fs.readFileSync(
        `${__dirname}/../out/notes/test-twoNotes/test - note with picture.md`,
        'utf8',
      ),
      fs.readFileSync(`${__dirname}/data/test-obsidianLink.md`, 'utf8'),
    );
    assert.equal(
      fs.existsSync(
        `${__dirname}/../out/notes/test-twoNotes/test -note with text only.md`,
      ),
      true,
    );

    assert.equal(
      fs.readFileSync(
        `${__dirname}/../out/notes/test-twoNotes/test -note with text only.md`,
        'utf8',
      ),
      fs.readFileSync(`${__dirname}/data/test-twoNotes-text.md`, 'utf8'),
    );
  });

  it('Enex file - no span style', async () => {
    const options: YarleOptions = {
      enexFile: './test/data/test-nospanstyle.enex',
      outputDir: 'out',
      isMetadataNeeded: true,
      plainTextNotesOnly: false,
      outputFormat: OutputFormat.ObsidianMD,
    };
    await yarle.dropTheRope(options);
    assert.equal(
      fs.existsSync(
        `${__dirname}/../out/notes/test-nospanstyle/test-nospanstyle.md`,
      ),
      true,
    );

    assert.equal(
      fs.readFileSync(
        `${__dirname}/../out/notes/test-nospanstyle/test-nospanstyle.md`,
        'utf8',
      ),
      fs.readFileSync(`${__dirname}/data/test-nospanstyle.md`, 'utf8'),
    );
  });

  it('Note with sublists', async () => {
    const options: YarleOptions = {
      enexFile: './test/data/test-sublists.enex',
      outputDir: 'out',
      isMetadataNeeded: true,
    };
    await yarle.dropTheRope(options);
    assert.equal(
      fs.existsSync(
        `${__dirname}/../out/notes/test-sublists/test - sublists.md`,
      ),
      true,
    );
    assert.equal(
      fs.readFileSync(
        `${__dirname}/../out/notes/test-sublists/test - sublists.md`,
        'utf8',
      ),
      fs.readFileSync(`${__dirname}/data/test-sublists.md`, 'utf8'),
    );
  });
  it('Note with sublists (valid html)', async () => {
    const options: YarleOptions = {
      enexFile: './test/data/test-sublists-valid.enex',
      outputDir: 'out',
      isMetadataNeeded: true,
    };
    await yarle.dropTheRope(options);
    assert.equal(
      fs.existsSync(
        `${__dirname}/../out/notes/test-sublists-valid/test - sublists - valid.md`,
      ),
      true,
    );
    assert.equal(
      fs.readFileSync(
        `${__dirname}/../out/notes/test-sublists-valid/test - sublists - valid.md`,
        'utf8',
      ),
      fs.readFileSync(`${__dirname}/data/test-sublists-valid.md`, 'utf8'),
    );
  });
  it('Enex file urlEncode whitespace', async () => {
    const options: YarleOptions = {
      enexFile: './test/data/test-urlencode.enex',
      outputDir: 'out',
      isMetadataNeeded: true,
      outputFormat: OutputFormat.UrlEncodeMD,
    };
    await yarle.dropTheRope(options);
    assert.equal(
      fs.existsSync(
        `${__dirname}/../out/notes/test-urlencode/test - note with picture (filename with spaces).md`,
         ),
      true,
    );

    assert.equal(
      fs.readFileSync(
           `${__dirname}/../out/notes/test-urlencode/test - note with picture (filename with spaces).md`,
        'utf8',
      ),
      fs.readFileSync(`${__dirname}/data/test-urlencode.md`, 'utf8'),
    );
  });
  it('Note with sublists (multiple)', async () => {
    const options: YarleOptions = {
      enexFile: './test/data/test-sublists-multiple.enex',
      outputDir: 'out',
      isMetadataNeeded: true,
    };
    await yarle.dropTheRope(options);
    assert.equal(
      fs.existsSync(
        `${__dirname}/../out/notes/test-sublists-multiple/test - sublists - multiple.md`,
      ),
      true,
    );
    assert.equal(
      fs.readFileSync(
        `${__dirname}/../out/notes/test-sublists-multiple/test - sublists - multiple.md`,
        'utf8',
      ),
      fs.readFileSync(`${__dirname}/data/test-sublists-multiple.md`, 'utf8'),
    );
  });

  it('Webclip - article', async () => {
    const options: YarleOptions = {
      enexFile: './test/data/test-webclip_article.enex',
      outputDir: 'out',
      isMetadataNeeded: true,
      plainTextNotesOnly: false,
      outputFormat: OutputFormat.ObsidianMD,
    };
    await yarle.dropTheRope(options);
    assert.equal(
      fs.existsSync(
        `${__dirname}/../out/notes/test-webclip_article/yarle evernote.md`,
      ),
      true,
    );

    assert.equal(
      fs.readFileSync(
        `${__dirname}/../out/notes/test-webclip_article/yarle evernote.md`,
        'utf8',
      ),
      fs.readFileSync(`${__dirname}/data/test-webclip_article.md`, 'utf8'),
    );
  });

  it('Webclip - simplified article', async () => {
    const options: YarleOptions = {
      enexFile: './test/data/test-webclip_simplifiedarticle.enex',
      outputDir: 'out',
      isMetadataNeeded: true,
      plainTextNotesOnly: false,
      outputFormat: OutputFormat.ObsidianMD,
    };
    await yarle.dropTheRope(options);
    assert.equal(
      fs.existsSync(
        `${__dirname}/../out/notes/test-webclip_simplifiedarticle/yarle evernote.md`,
      ),
      true,
    );

    assert.equal(
      fs.readFileSync(
        `${__dirname}/../out/notes/test-webclip_simplifiedarticle/yarle evernote.md`,
        'utf8',
      ),
      fs.readFileSync(
        `${__dirname}/data/test-webclip_simplifiedarticle.md`,
        'utf8',
      ),
    );
  });

  it('Webclip - bookmark', async () => {
    const options: YarleOptions = {
      enexFile: './test/data/test-webclip_bookmark.enex',
      outputDir: 'out',
      isMetadataNeeded: true,
      plainTextNotesOnly: false,
      outputFormat: OutputFormat.ObsidianMD,
    };
    await yarle.dropTheRope(options);
    assert.equal(
      fs.existsSync(
        `${__dirname}/../out/notes/test-webclip_bookmark/yarle.md`,
      ),
      true,
    );

    assert.equal(
      fs.readFileSync(
        `${__dirname}/../out/notes/test-webclip_bookmark/yarle.md`,
        'utf8',
      ),
      fs.readFileSync(`${__dirname}/data/test-webclip_bookmark.md`, 'utf8'),
    );
  });

  it('Webclip - screenshot', async () => {
    const options: YarleOptions = {
      enexFile: './test/data/test-webclip_screenshot.enex',
      outputDir: 'out',
      isMetadataNeeded: true,
      plainTextNotesOnly: false,
      outputFormat: OutputFormat.ObsidianMD,
    };
    await yarle.dropTheRope(options);
    assert.equal(
      fs.existsSync(
        `${__dirname}/../out/notes/test-webclip_screenshot/yarle.md`,
      ),
      true,
    );

    assert.equal(
      fs.readFileSync(
        `${__dirname}/../out/notes/test-webclip_screenshot/yarle.md`,
        'utf8',
      ),
      fs.readFileSync(`${__dirname}/data/test-webclip_screenshot.md`, 'utf8'),
    );
  });

  it('Folder of enex files', async () => {
    const options = [
      '--enexSource=./test/data/TestDirNotes',
      '--outputDir=out',
      '--isMetadataNeeded=true',
      '--plainTextNotesOnly=false',
      `--outputFormat=${OutputFormat.ObsidianMD}`,
      '--skipEnexFileNameFromOutputPath=true',
    ];
    await dropTheRopeRunner.run(options);
    assert.equal(
      fs.existsSync(
        `${__dirname}/../out/notes/examplenoteinsamedir.md`,
      ),
      true,
    );
    assert.equal(
      fs.existsSync(
        `${__dirname}/../out/notes/examplenoteinsamedir.1.md`,
      ),
      true,
    );
  });

  it('applies template passed as parameter', async () => {
    const options: YarleOptions = {
      enexFile: './test/data/test-template.enex',
      outputDir: 'out',
      templateFile: './test/data/template_tags_bottom.templ',
      isMetadataNeeded: true,
      outputFormat: OutputFormat.ObsidianMD,
      skipEnexFileNameFromOutputPath: false,

    };
    await yarle.dropTheRope(options);
    assert.equal(
      fs.existsSync(
        `${__dirname}/../out/notes/test-template/test - templates.md`,
      ),
      true,
    );

    assert.equal(
      fs.readFileSync(
        `${__dirname}/../out/notes/test-template/test - templates.md`,
        'utf8',
      ),
      fs.readFileSync(`${__dirname}/data/test - templates.md`, 'utf8'),
    );
  });

  it('only renders content with a template with just the content block', async () => {
    const options: YarleOptions = {
      enexFile: './test/data/test-template 2.enex',
      outputDir: 'out',
      templateFile: './test/data/bare_template.templ',
      isMetadataNeeded: true,
      outputFormat: OutputFormat.ObsidianMD,
      skipEnexFileNameFromOutputPath: false,

    };
    await yarle.dropTheRope(options);
    assert.equal(
      fs.existsSync(
        `${__dirname}/../out/notes/test-template 2/test - templates just content.md`,
      ),
      true,
    );

    assert.equal(
      fs.readFileSync(
        `${__dirname}/../out/notes/test-template 2/test - templates just content.md`,
        'utf8',
      ),
      fs.readFileSync(
        `${__dirname}/data/test - templates just content.md`,
        'utf8',
      ),
    );
  });
});
