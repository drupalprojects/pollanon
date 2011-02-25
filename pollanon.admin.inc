<?php
/**
*/

/**
 * @file
 * Administration functions and forms.
 */

function pollanon_settings_form() {
  $form = array();

  $form['pollanon_use_cookie_method'] = array(
    '#type' => 'checkbox',
    '#title' => t('Use cookies to determine poll displays'),
    '#default_value' => variable_get('pollanon_use_cookie_method', TRUE),
    );

  $form['pollanon_use_ajah'] = array(
    '#type' => 'checkbox',
    '#title' => t('Use AJAH'),
    '#description' => t('Provides more flexible methods to update user interface. Prevents also search engiges to index poll results.'),
    '#default_value' => variable_get('pollanon_use_ajah', FALSe),
    );

  return system_settings_form($form);
}