<template lang="pug">
transition(name="fade")
  .feedback-form-component
    transition(name="fade", mode="in-out")
      .message(v-if="status")
        template(v-if="status === 200")
          .success
            h4.h4 Спасибо за&nbsp;Ваше обращение!<br>Я перезвоню Вам в&nbsp;ближайшее время!
        template(v-else)
          .error.flex.column
            h4.h4 Что-то пошло не так&nbsp;&nbsp;):
            .text Ваша заявка не&nbsp;отправлена, возможно проблемы с&nbsp;сервером, либо с&nbsp;доступом в&nbsp;интернет
            button.item(@click.prevent="retry") Попробовать еще раз
      form(v-if="!status")
        .section
          h3.h3.h3-animation Заказать обратный звонок
          .fields.fields-animation
            commonInput.text-italics(
              v-model="form.name",
              :error="invalidNameMessage",
              required
            ) Имя
            commonInput.text-italics(
              v-model="form.phone",
              type="phone",
              :error="invalidPhoneMessage",
              required
            ) Телефон
            .radio.flex
              commonRadio.text-italics(
                v-model="form.radio",
                value="телефон",
                :error="invalidRadioMessage",
                required,
                :checked="form.radio === 'телефон'"
              ) Звоните!
              commonRadio.text-italics(
                v-model="form.radio",
                value="WhatsApp",
                :error="invalidRadioMessage",
                required,
                :checked="form.radio === 'WhatsApp'",
              ) Лучше напишите мне на&nbsp;WhatsApp
            .policy.flex.j-start.a-center
              commonCheckbox(
                v-model="form.checked",
                :value="form.checked",
                :error="invalidCheckMessage",
                required
              ) Даю&nbsp;согласие&nbsp;на&nbsp;обработку&ensp;
              a(href="/policy", target="_blank") персональных&nbsp;данных
            button.item(@click.prevent="send") отправить
</template>

<script>
import mixinForm from './form'


export default {
  name: 'feedback-form-component',
  mixins: [mixinForm],
  methods: {
    preparation () {
      this.checkFieldValidity(
        this.$v.form.name,
        'invalidNameMessage',
        'Как к вам обращаться?'
      )
      this.checkFieldValidity(this.$v.form.radio, 'invalidRadioMessage')
      this.checkPhoneValidity()
      if (!this.form.checked) {
        this.invalidCheckMessage = ' '
      }
      if (
        this.$v.form.phone.required &&
        this.$v.form.phone.phone &&
        this.$v.form.name.required &&
        this.$v.form.radio.required &&
        this.form.checked
      ) {
        this.readyToSent = true
      }
    },
    send () {
      this.preparation()
      if (this.readyToSent) {
        const dataToSend = {
          name: this.form.name,
          phone: this.form.phone,
          email: this.form.radio
        }
        emailjs
          .send(
            'service',
            'template_',
            dataToSend,
            '8888'
          )
          .then(() => {
            this.status = 200
            setTimeout(() => {
              this.retry()
            }, 5000)
          })
          .catch(() => {
            this.status = 400
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.feedback-form-component {
  position: relative;
  padding-bottom: 150px;
  min-height: 700px;
  .message {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    background-color: $color-black;
    transition: all 0.2s ease-in-out;
    .success {
      .h4 {
        position: absolute;
        width: 100%;
        margin: 0 auto;
        width: 100%;
        max-width: 80%;
        color: inherit;
        border: none;
        transition: all 0.2s ease-in-out;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
      }
    }
    .error {
      gap: 50px;
      position: absolute;
      width: 100%;
      margin: 0 auto;
      width: 100%;
      max-width: 80%;
      color: inherit;
      border: none;
      transition: all 0.2s ease-in-out;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .section {
    position: relative;
    .h3 {
      text-indent: 50px;
    }
  }
  .radio {
    gap: 50px;
    margin-bottom: 100px;
  }
  .text-italics {
    font-size: 22px;
    &.active {
      color: $color-text;
      transform: translateX(0);
    }
  }
  .fields {
    width: 60%;
    .text-italics,
    .policy {
      margin-bottom: 50px;
    }
    .policy {
      transition: all 0.4s ease;
      a {
        font-size: 14px;
        line-height: 100%;
        border-bottom: 1px solid;
      }
      @include hovers {
        &:hover {
          a {
            color: $color-primary;
          }
        }
      }
    }
  }
  @include main {
    .fields {
      width: 80%;
    }
  }
  @include md {
    min-height: 400px;
    padding-bottom: 100px;
    .section {
      &:not(:last-child) {
        margin-bottom: 60px;
      }
      .h3 {
        font-size: 36px;
      }
    }
    .fields {
      width: 100%;
    }
  }
  @include sm {
    .radio {
      flex-direction: column;
      .text-italics {
        margin-bottom: 0;
      }
    }
  }
  @include xs {
    background-color: $color-black;
    z-index: 25;
    padding-bottom: 50px;
    .wrapper {
      padding: 0;
    }
    .fields {
      .policy {
        padding-left: 15px;
        flex-wrap: wrap;
      }
    }
    .radio {
      padding-left: 15px;
      .text-italics {
        font-size: 16px;
      }
    }
    .section .h3 {
      padding: 0 15px;
      margin-left: 0;
      margin-bottom: 30px;
      text-align: center;
      font-size: 20px;
      text-indent: 0;
    }
  }
}
</style>
