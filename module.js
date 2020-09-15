const fs = require('fs');
const pdflib = require('pdf-lib');
async function go(template, out, data) {
	const pdfDoc = await pdflib.PDFDocument.load(fs.readFileSync(template));
	const form = pdfDoc.getForm();
	form
		.getTextField('SEPA-Firmenlastschrift-Mandat[0].#pageSet[0].V1[0].FUSSZEILE[0].LAUFVERMERK[0]')
		.setText('by SEPA-PDF-Generator');
	form
		.getTextField('SEPA-Firmenlastschrift-Mandat[0].#pageSet[0].V1[0].FUSSZEILE[0].LAUFVERMERK[0]')
		.enableReadOnly();
	//
	form.getTextField('SEPA-Firmenlastschrift-Mandat[0].V1[0].KIZEILE41[0]').setText(data.creditor_name);
	form.getTextField('SEPA-Firmenlastschrift-Mandat[0].V1[0].KIZEILE41[0]').enableReadOnly();
	//
	form.getTextField('SEPA-Firmenlastschrift-Mandat[0].V1[0].KIZEILE42[0]').setText(data.creditor_str_nr);
	form.getTextField('SEPA-Firmenlastschrift-Mandat[0].V1[0].KIZEILE42[0]').enableReadOnly();
	//
	form.getTextField('SEPA-Firmenlastschrift-Mandat[0].V1[0].KIZEILE43[0]').setText(data.creditor_plz_location);
	form.getTextField('SEPA-Firmenlastschrift-Mandat[0].V1[0].KIZEILE43[0]').enableReadOnly();
	//
	form.getTextField('SEPA-Firmenlastschrift-Mandat[0].V1[0].KIAUFENTHALTSLAND[0]').setText(data.creditor_country);
	form.getTextField('SEPA-Firmenlastschrift-Mandat[0].V1[0].KIAUFENTHALTSLAND[0]').enableReadOnly();
	//
	form.getTextField('SEPA-Firmenlastschrift-Mandat[0].V1[0].KIIDENTIFIKATIONSNUMMER[0]').setText(data.creditor_id);
	form.getTextField('SEPA-Firmenlastschrift-Mandat[0].V1[0].KIIDENTIFIKATIONSNUMMER[0]').enableReadOnly();
	//
	form.getTextField('SEPA-Firmenlastschrift-Mandat[0].V1[0].KIMANDATAREFNR[0]').setText(data.mandate_ref);
	form.getTextField('SEPA-Firmenlastschrift-Mandat[0].V1[0].KIMANDATAREFNR[0]').enableReadOnly();
	//
	form.getCheckBox('SEPA-Firmenlastschrift-Mandat[0].V1[0].KRWIEDERKEHREND[0]').check();
	form.getCheckBox('SEPA-Firmenlastschrift-Mandat[0].V1[0].KRWIEDERKEHREND[0]').enableReadOnly();
	//
	form.getCheckBox('SEPA-Firmenlastschrift-Mandat[0].V1[0].KREINMALIG[0]').uncheck();
	form.getCheckBox('SEPA-Firmenlastschrift-Mandat[0].V1[0].KREINMALIG[0]').enableReadOnly();
	//
	form.getTextField('SEPA-Firmenlastschrift-Mandat[0].V1[0].ZAHLEMPFNAME[0]').setText(data.debtor);
	form.getTextField('SEPA-Firmenlastschrift-Mandat[0].V1[0].ZAHLEMPFNAME[0]').enableReadOnly();
	//
	form.getTextField('SEPA-Firmenlastschrift-Mandat[0].V1[0].ZAHLEMPFSTRNR[0]').setText(data.debtor_str_nr);
	form.getTextField('SEPA-Firmenlastschrift-Mandat[0].V1[0].ZAHLEMPFSTRNR[0]').enableReadOnly();
	//
	form.getTextField('SEPA-Firmenlastschrift-Mandat[0].V1[0].ZAHLEMPFPLZORT[0]').setText(data.debtor_plz_location);
	form.getTextField('SEPA-Firmenlastschrift-Mandat[0].V1[0].ZAHLEMPFPLZORT[0]').enableReadOnly();
	//
	form.getTextField('SEPA-Firmenlastschrift-Mandat[0].V1[0].ZAHLEMPFAUFENTHALTSLAND[0]').setText(data.debtor_country);
	form.getTextField('SEPA-Firmenlastschrift-Mandat[0].V1[0].ZAHLEMPFAUFENTHALTSLAND[0]').enableReadOnly();
	//
	form.getTextField('SEPA-Firmenlastschrift-Mandat[0].V1[0].IBANEINZUG[0]').setText(data.debtor_iban);
	form.getTextField('SEPA-Firmenlastschrift-Mandat[0].V1[0].IBANEINZUG[0]').enableReadOnly();
	//
	form.getTextField('SEPA-Firmenlastschrift-Mandat[0].V1[0].BICEINZUG[0]').setText(data.debtor_bic);
	form.getTextField('SEPA-Firmenlastschrift-Mandat[0].V1[0].BICEINZUG[0]').enableReadOnly();
	//
	//
	pdfDoc.setTitle(data.mandate_ref);
	pdfDoc.setSubject('SEPA-Lastschriftmandat');
	pdfDoc.setAuthor('SEPA-PDF-Generator');
	pdfDoc.setCreator('SEPA-PDF-Generator');
	//
	const pdfBytes = await pdfDoc.save();
	fs.writeFileSync(out, pdfBytes);
}
module.exports = {
	go
};
