/**
 * Created by jan on 18.03.17.
 */
var fs = require('fs');
var chai = require('chai');
var tabletojson = require('../lib/tabletojson');
chai.should();

process.on('unhandledRejection', function (reason) // workaround for https://github.com/mochajs/mocha/issues/1128
{
    throw reason;
});

describe('TableToJson', function () {
    it('should convert an url correctly', function (done) {
        this.timeout(3000);
        tabletojson.convertUrl("https://en.wikipedia.org/wiki/Comparison_of_free_and_open-source_software_licenses", function (tables) {
            var general = tables[0];
            var agpl = general[1];
            agpl.should.include.all.keys(['License', 'Latest version', 'Distribution']);
            agpl.License.should.eql('Affero General Public License');
            agpl['Latest version'].should.eql('2.0');

            general.should.include({
                License: 'MIT license / X11 license',
                Author: 'MIT',
                'Latest version': 'N/A',
                'Publication date': '1988',
                Linking: 'Permissive[23]',
                Distribution: 'Permissive[23]',
                Modification: 'Permissive[23]',
                'Patent grant': 'Manually[23]',
                'Private use': 'Yes[23]',
                Sublicensing: 'Permissive[23]',
                'TM grant': 'Manually[23]'
            });

            done();
        })
    });

    it('should convert html correctly', function(done) {
        fs.readFile( __dirname + '/sampletable.html', function (err, data) {
            if (err) {
                throw err;
            }
            var table = tabletojson.convert(data)[0];
            table.should.include({
                Name: 'Test 1',
                Age: '26'
            });
            done();
        });
    });
});