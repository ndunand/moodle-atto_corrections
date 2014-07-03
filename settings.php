<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Atto text editor integration version file.
 *
 * @package    atto_corrections
 * @copyright  2014 Université de Lausanne
 * @author     Nicolas Dunand <nicolas.dunand@unil.ch>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

$ADMIN->add('editoratto', new admin_category('atto_corrections', new lang_string('pluginname', 'atto_corrections')));

$settings = new admin_settingpage('atto_corrections_settings', new lang_string('settings', 'atto_corrections'));
if ($ADMIN->fulltree) {
    $name = new lang_string('corrtypes', 'atto_corrections');
    $desc = new lang_string('corrtypes_desc', 'atto_corrections');
    $default = new lang_string('corrtypes_default', 'atto_corrections');
    $setting = new admin_setting_configtextarea('atto_corrections/corrtypes', $name, $desc, $default);
    $settings->add($setting);
}
