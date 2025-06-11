/*!
 * Controls.js
 * http://controlsjs.com/
 *
 * Copyright (c) 2014 Position s.r.o.  All rights reserved.
 *
 * This version of Controls.js is licensed under the terms of GNU General Public License v3.
 * http://www.gnu.org/licenses/gpl-3.0.html
 *
 * The commercial license can be purchased at Controls.js website.
 */
if (typeof ngc_Lang === 'undefined') ngc_Lang = {};
if (typeof ngc_Lang['sl'] === 'undefined') ngc_Lang['sl'] = {};

// TranslationContext: User input validation errors. Errors while communicating with the server.

ngc_Lang['sl']['viewmodel_err_unknown'] = 'Neveljavna vrednost.';
ngc_Lang['sl']['viewmodel_err_type'] = 'Neveljavna vrsta vrednosti.';
ngc_Lang['sl']['viewmodel_err_type_bool'] = 'Vrednost mora biti »da« (1) ali »ne« (0).';
ngc_Lang['sl']['viewmodel_err_type_integer'] = 'Vrednost mora biti celo število.';
ngc_Lang['sl']['viewmodel_err_type_decimal'] = 'Vrednost mora biti število.';
ngc_Lang['sl']['viewmodel_err_type_string'] = 'Vrednost mora biti niz.';
ngc_Lang['sl']['viewmodel_err_type_invalidchars'] = 'Vrednost vsebuje neveljavne znake.';
ngc_Lang['sl']['viewmodel_err_type_datetime'] = 'Vrednost mora biti datum in čas.';
ngc_Lang['sl']['viewmodel_err_type_date'] = 'Vrednost mora biti datum.';
ngc_Lang['sl']['viewmodel_err_type_time'] = 'Vrednost mora biti čas.';
ngc_Lang['sl']['viewmodel_err_type_array'] = 'Vrednost mora biti polje.';
ngc_Lang['sl']['viewmodel_err_empty'] = 'Vrednost je obvezna.';
ngc_Lang['sl']['viewmodel_err_min'] = 'Vrednost mora biti večja ali enaka %s.';
ngc_Lang['sl']['viewmodel_err_min_novalue'] = 'Vrednost je nižja od dovoljene omejitve.';
ngc_Lang['sl']['viewmodel_err_min_array'] = 'Število elementov mora biti večje ali enako %d.';
ngc_Lang['sl']['viewmodel_err_max'] = 'Vrednost mora biti manjša ali enaka %s.';
ngc_Lang['sl']['viewmodel_err_max_novalue'] = 'Vrednost je višja od dovoljene omejitve.';
ngc_Lang['sl']['viewmodel_err_max_array'] = 'Število elementov mora biti manjše ali enako %d.';
ngc_Lang['sl']['viewmodel_err_enum'] = 'Ta vrednost ni dovoljena.';
ngc_Lang['sl']['viewmodel_err_len'] = 'Vrednost je predolga (največ %d).';
ngc_Lang['sl']['viewmodel_err_len_unknown'] = 'Vrednost je predolga.';
ngc_Lang['sl']['viewmodel_err_minlen'] = 'Vrednost je prekratka (najmanj %d).';
ngc_Lang['sl']['viewmodel_err_minlen_unknown'] = 'Vrednost je prekratka.';
ngc_Lang['sl']['viewmodel_err_format'] = 'Vrednost ni v zahtevani obliki.';
ngc_Lang['sl']['viewmodel_err_cmd'] = 'Operacija ni uspela (%s).';
ngc_Lang['sl']['viewmodel_err_cmd_data'] = 'Zahteva za podatke ni uspela (%s).';
ngc_Lang['sl']['viewmodel_err_cmd_viewmodel'] = '%s';
ngc_Lang['sl']['viewmodel_err_cmd_command'] = '%s';
ngc_Lang['sl']['viewmodel_err_cmd_timeout'] = 'časovna omejitev';
ngc_Lang['sl']['viewmodel_err_cmd_emptyresponse'] = 'prazen odgovor';
ngc_Lang['sl']['viewmodel_err_cmd_parseerror'] = 'napaka pri razčlenjevanju';
ngc_Lang['sl']['viewmodel_err_cmd_httpstatus'] = 'stanje %s';
