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
if (typeof ngc_Lang['ja'] === 'undefined') ngc_Lang['ja'] = {};

// TranslationContext: User input validation errors. Errors while communicating with the server.

ngc_Lang['ja']['viewmodel_err_unknown'] = '無効な値です。';
ngc_Lang['ja']['viewmodel_err_type'] = '無効な型の値です。';
ngc_Lang['ja']['viewmodel_err_type_bool'] = '値はyes (1) またはno (0) である必要があります。';
ngc_Lang['ja']['viewmodel_err_type_integer'] = '値は整数である必要があります。';
ngc_Lang['ja']['viewmodel_err_type_decimal'] = '値は数値である必要があります。';
ngc_Lang['ja']['viewmodel_err_type_string'] = '値は文字列である必要があります。';
ngc_Lang['ja']['viewmodel_err_type_invalidchars'] = '値に無効な文字が含まれています。';
ngc_Lang['ja']['viewmodel_err_type_datetime'] = '値は日付と時刻である必要があります。';
ngc_Lang['ja']['viewmodel_err_type_date'] = '値は日付である必要があります。';
ngc_Lang['ja']['viewmodel_err_type_time'] = '値は時刻である必要があります。';
ngc_Lang['ja']['viewmodel_err_type_array'] = '値は配列である必要があります。';
ngc_Lang['ja']['viewmodel_err_empty'] = '値が必要です。';
ngc_Lang['ja']['viewmodel_err_min'] = '値は%s以上である必要があります。';
ngc_Lang['ja']['viewmodel_err_min_novalue'] = '値が許可されている制限より低くなっています。';
ngc_Lang['ja']['viewmodel_err_min_array'] = 'アイテム数は%d以上である必要があります。';
ngc_Lang['ja']['viewmodel_err_max'] = '値は%s以下である必要があります。';
ngc_Lang['ja']['viewmodel_err_max_novalue'] = '値が許可されている制限より高くなっています。';
ngc_Lang['ja']['viewmodel_err_max_array'] = 'アイテム数は%d以下である必要があります。';
ngc_Lang['ja']['viewmodel_err_enum'] = 'この値は許可されていません。';
ngc_Lang['ja']['viewmodel_err_len'] = '値が長すぎます (最大%d)。';
ngc_Lang['ja']['viewmodel_err_len_unknown'] = '値が長すぎます。';
ngc_Lang['ja']['viewmodel_err_minlen'] = '値が短すぎます (最小%d)。';
ngc_Lang['ja']['viewmodel_err_minlen_unknown'] = '値が短すぎます。';
ngc_Lang['ja']['viewmodel_err_format'] = '値が必須の形式ではありません。';
ngc_Lang['ja']['viewmodel_err_cmd'] = '操作に失敗しました(%s)。';
ngc_Lang['ja']['viewmodel_err_cmd_data'] = 'データリクエストに失敗しました(%s)。';
ngc_Lang['ja']['viewmodel_err_cmd_viewmodel'] = '%s';
ngc_Lang['ja']['viewmodel_err_cmd_command'] = '%s';
ngc_Lang['ja']['viewmodel_err_cmd_timeout'] = 'タイムアウト';
ngc_Lang['ja']['viewmodel_err_cmd_emptyresponse'] = '空のレスポンス';
ngc_Lang['ja']['viewmodel_err_cmd_parseerror'] = '解析エラー';
ngc_Lang['ja']['viewmodel_err_cmd_httpstatus'] = 'ステータス%s';
