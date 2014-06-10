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

/**
 * Initialise the js strings required for this plugin
 */
function atto_corrections_strings_for_js() {
    global $PAGE;

    $PAGE->requires->strings_for_js(array(
                                        'addcomment',
                                        'dialogtitle',
                                        'corrtype',
                                        'corrtext',
                                        'fulltexttitle',
                                        'addmark',
                                        'removemark',
                                        'displayfulltext'
                                    ),
                                    'atto_corrections');
}


/**
 * Set params for this plugin
 * @param string $elementid
 */
function atto_corrections_params_for_js($elementid, $options, $fpoptions) {
    // Pass the number of visible groups as a param.
    $corrtypes = get_config('atto_corrections', 'corrtypes');
    $list = explode("\n", (str_replace("\r", '', $corrtypes)));
    $types = array();
    $keys = array();
    $matches = null;
    foreach($list as $item) {
        if (preg_match('/^([^=]+)\s?=\s?(.*)$/', $item, $matches)) {
            $types[] = array('abbr' => trim($matches[1]), 'descr' => trim($matches[2]));
            $keys[] = trim($matches[1]);
        }
    }
    return array('corrtypes' => $types, 'corrtypekeys' => $keys);
}
