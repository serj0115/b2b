"use strict";
var _extends = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var o = arguments[t];
        for (var a in o) Object.prototype.hasOwnProperty.call(o, a) && (e[a] = o[a])
    }
    return e
};
$(document).ready(function() { 
    $('.default-form').on('keypress', event => {
      const $input = $(event.target),
        $form = $(event.currentTarget),
        value = $input.val(),
        key = String.fromCharCode(event.which);

      // fix FF bug
      if (event.which < 48) {
        return;
      }

      if ($input.attr('name') === 'year') {
        const re = /^[0-9]$/;

        return value.length < 4 && re.test(key);

      }

      if ($input.attr('name') === 'name') {
        const re = /^[a-zA-ZА-Яа-яёЁ\s]$/;

        return re.test(key);
      }

      if ($input.attr('name') === 'pin') {
        const re = /^[0-9]$/;

        return value.length < 5 && re.test(key);
      }
    });

    $('.default-form').on('keyup input', event => {
      const $input = $(event.target),
        $form = $(event.currentTarget),
        $submit = $form.find('[type="submit"]'),
        $inputs = $form.find('[name]');

      if ($input.val()) {
        $input.data('dirty', true);
      }

      let isValid = true;
      $inputs.each((index, element) => {
        const input = $(element);

        if (!validateInput(input)) {
          input.data('dirty') && input.closest('.form-group').addClass('has-danger');
          isValid = false;
        } else {
          input
            .closest('.form-group')
            .removeClass('has-danger')
        }
      });

      $submit.prop('disabled', !isValid);
    });

    function validateInput(input) {
      const value = input.val();
      let isValid = true;

      if (input.hasClass('js-not-required')) {
        return true;
      }

      // check if value exist and it is required field
      if (!(value && value.trim()) && !input.hasClass('js-not-required')) {
        isValid = false;
      }

      if (input.attr('name') === 'email') {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        isValid = re.test(value);
      }

      if (input.attr('name') === 'phone') {
        isValid = value && value.indexOf('_') === -1;
      }


      if (input.attr('name') === 'name') {
        const re = /^[a-zA-ZА-Яа-яёЁ\s]+$/;

        isValid = re.test(value);
      }

      return isValid;
    }

    function sendRequest($form, params = {}) {
      var $submit = $form.find('[type="submit"]'),
        url = $form.prop('action'),
        method = $form.data('method') || $form.prop('method') || 'GET',
        data = {};

      $form.serializeArray().map(item => {
        if (item.name) {
          data[item.name] = item.value;
        }
      });

      if (data.phone) {
        data.phone = data.phone.replace(/\D/g,'');
      }

      $form.addClass('default-form--loading');
      $submit.prop('disabled', true);

      return $.ajax(Object.assign({
        url,
        method,
        data,
      }, params))
        .always(() => {
          $form.removeClass('default-form--loading');
        });
    }

    function showFormMessage($form, type, content) {
      $form.addClass('default-form--show-message');
      setTimeout(() => {
        $form[0].reset();
        $form.removeClass('default-form--show-message');
      }, 6000);
    }


    $('.js-default-form').on('submit', event => {
      event.preventDefault();

      var $form = $(event.target),
        jqXHR = sendRequest($form);

      jqXHR
        .always(function (response) {
          showFormMessage($form);
        });
    });


	});
