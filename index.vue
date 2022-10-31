<template lang="pug">
transition(name="fade")
  .form-component
    transition(name="fade", mode="in-out")
      .message(v-if="status")
        template(v-if="status === 200")
          .success
            h4.h4 Спасибо за&nbsp;ваше обращение! <br> Это автоматический ответ, чтобы Вы&nbsp;знали, что я&nbsp;получила ваше письмо. И&nbsp;отвечу Вам в&nbsp;скором времени.
        template(v-else)
          .error.flex.column
            h4.h4 Что-то пошло не так&nbsp;&nbsp;):
            .text Ваша заявка не&nbsp;отправлена, возможно проблемы с&nbsp;сервером, либо с&nbsp;доступом в&nbsp;интернет
            button.item(@click.prevent="retry") Попробовать еще раз
      form(v-if="!status")
        .section
          h3.h3.h3-animation Оставьте ваши данные и&nbsp;я&nbsp;свяжусь с&nbsp;Вами
          .fields.fields-animation
            commonInput.text-italics(
              v-model="form.name",
              :error="invalidNameMessage",
              required
            ) Имя*
            commonInput.text-italics(
              v-model="form.email",
              type="text",
              :error="invalidEmailMessage",
              required
            ) Почта*
            commonInput.text-italics(v-model="form.phone", type="phone") Телефон
            .policy.flex.j-start.a-center
              commonCheckbox(
                v-model="form.checked",
                :value="form.checked",
                :error="invalidCheckMessage",
                required
              ) Даю&nbsp;согласие&nbsp;на&nbsp;обработку&ensp;
              a(href="/policy", target="_blank") персональных данных
            button.item(@click.prevent="send") отправить
</template>

<script>
import mixinForm from "./form"

export default {
  name: "form-component",
  mixins: [mixinForm]
}
</script>

<style lang="scss" scoped>
.form-component {
  .message {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background-color: rgba($color-black, 0.9);
    transition: all 0.2s ease-in-out;
    .success {
      .h4 {
        position: absolute;
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
  .fields {
    width: 70%;
    .policy {
      margin-bottom: 50px;
      a {
        font-size: 14px;
        line-height: 100%;
        border-bottom: 1px solid;
      }
    }
    .policy {
      transition: all 0.4s ease;
      @include hovers {
        &:hover {
          a {
            color: $color-primary;
          }
        }
      }
    }
  }
  @include md {
    .section {
      &:not(:last-child) {
        margin-bottom: 60px;
        .h3 {
          font-size: 36px;
        }
      }
      .fields {
        width: 100%;
      }
    }
  }
  @include xs {
    background-color: $color-black;
    padding-bottom: 50px;
    .section .h3 {
      font-size: 24px;
      text-indent: 10px;
      margin-left: 0;
      margin-bottom: 30px;
    }
    .fields {
      .policy {
        padding-left: 15px;
      }
    }
  }
}
</style>
