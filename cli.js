const fs = require('fs');
const prompt = require('async-prompt');
if (!fs.existsSync('./output')) {
	fs.mkdirSync('./output');
}
const pdfCreationModule = require('./module');
async function main() {
	const creditor_name = await prompt('creditor_name: ');
	const creditor_str_nr = await prompt('creditor_str_nr: ');
	const creditor_plz_location = await prompt('creditor_plz_location: ');
	const creditor_country = await prompt('creditor_country: ');
	const creditor_id = await prompt('creditor_id: ');
	const mandate_ref = await prompt('mandate_ref: ');
	const debtor = await prompt('debtor: ');
	const debtor_str_nr = await prompt('debtor_str_nr: ');
	const debtor_plz_location = await prompt('debtor_plz_location: ');
	const debtor_country = await prompt('debtor_country: ');
	const debtor_iban = await prompt('debtor_iban: ');
	const debtor_bic = await prompt('debtor_bic: ');
	//
	const mandate_ref_final = 'SEPA-M-K-' + mandate_ref;
	pdfCreationModule.go('./Firmenmandat.pdf', `./output/${mandate_ref_final}.pdf`, {
		creditor_name,
		creditor_str_nr,
		creditor_plz_location,
		creditor_country,
		creditor_id,
		mandate_ref: mandate_ref_final,
		debtor,
		debtor_str_nr,
		debtor_plz_location,
		debtor_country,
		debtor_iban,
		debtor_bic
	});
}
main();
