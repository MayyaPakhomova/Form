import Vue from 'vue'
import Vuelidate from 'vuelidate'
import emailjs from '@emailjs/browser'
import { required, email } from 'vuelidate/lib/validators'

import commonInput from '@/components/common/input'
import iconArrow from '@/components/icons/arrow'
import commonCheckbox from '@/components/common/checkbox'
import commonRadio from '@/components/common/radio'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

Vue.use(Vuelidate)

const phone = (value, vm) => {
  const pattern = /^(\+7)[\s]\([0-9]{3}\)[\s][0-9]{3}-[0-9]{2}-[0-9]{2}$/
  const reg = new RegExp(pattern)
  return reg.test(value)
}
export default {
  components: {
    commonInput,
    commonCheckbox,
    commonRadio,
    iconArrow
  },
  data () {
    return {
      status: 0,
      form: {
        name: '',
        phone: '',
        email: '',
        radio: '',
        checked: false
      },
      invalidNameMessage: '',
      invalidEmailMessage: '',
      invalidPhoneMessage: '',
      invalidCheckMessage: '',
      invalidRadioMessage: '',
      readyToSent: false
    }
  },
  validations: {
    form: {
      name: {
        required
      },
      email: {
        required,
        email
      },
      phone: {
        phone,
        required
      },
      radio: {
        required
      }
    }
  },
  watch: {
    form: {
      handler () {
        if (this.form.checked) {
          this.form.checked = true
          this.invalidCheckMessage = ''
        }
      },
      deep: true
    }
  },
  methods: {
    checkFieldValidity (field, msg, msgText = 'Это поле обязательно для заполнения') {
      field.required ? this[msg] = '' : this[msg] = msgText
      this.isDisabled = false
    },
    checkEmailValidity () {
      this.invalidEmailMessage = ''
      if (!this.$v.form.email.email) {
        this.invalidEmailMessage = 'Проверьте Вашу почту'
      }
      if (!this.$v.form.email.required) {
        this.invalidEmailMessage = 'На какую почту мне написать?'
      }
    },
    checkPhoneValidity () {
      this.invalidPhoneMessage = ''
      if (!this.$v.form.phone.phone) {
        this.invalidPhoneMessage = 'Проверьте ваш телефон'
      }
      if (!this.$v.form.phone.required) {
        this.invalidPhoneMessage = 'По какому номеру мне перезвонить?'
      }
    },
    retry () {
      this.form = {
        name: '',
        phone: '',
        email: '',
        radio: '',
        checked: false
      }
      this.status = 0
    },
    preparation () {
      this.checkFieldValidity(this.$v.form.name, 'invalidNameMessage', 'Как к вам обращаться?')
      if (this.$v.form.email) {
        this.checkEmailValidity()
      }
      if (!this.form.checked) {
        this.invalidCheckMessage = ' '
      }
      if (
        this.$v.form.email.required &&
        this.$v.form.email.email &&
        this.$v.form.name.required &&
        this.form.checked) {
        this.readyToSent = true
      }
    },
    send () {
      this.preparation()
      if (this.readyToSent) {
        const dataToSend = {
          name: this.form.name,
          phone: this.form.phone,
          email: this.form.email
        }
        emailjs.send(
          'service',
          'template',
          dataToSend,
          '8888'
        )
          .then(
            () => {
              this.status = 200
              setTimeout(() => {
                this.retry()
              }, 5000)
            }).catch(() => {
            this.status = 400
          })
      }
    }
  },
  mounted () {
    const tl = gsap.timeline()
    const tll = gsap.timeline()

    tl.from('.h3-animation', { duration: 1, xPercent: -30, ease: 'Power1.easeOut' })
    tll.from('.fields-animation', { duration: 1, yPercent: 130, opacity: 0, ease: 'Power1.ease' })
    ScrollTrigger.create({
      animation: tl,
      trigger: '.h3-animation',
      start: 'top bottom',
      end: 'bottom bottom'
    })
    ScrollTrigger.create({
      animation: tll,
      trigger: '.fields-animation',
      start: 'top-=70% bottom',
      end: 'bottom bottom'
    })
  }
}
