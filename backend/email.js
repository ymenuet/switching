import sgMail from '@sendgrid/mail'

const sendEmail = async ({ to, subject, text, html }) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    to: to,
    from: 'ni.fraisse@gmail.com', // Use the email address or domain you verified above
    subject: 'hey bro',
    text: 'text msg',
    html: '<strong>html msg in strong tags</strong>',
  }

  try {
    await sgMail.send(msg)
  } catch (error) {
    console.error(error)

    if (error.response) {
      console.error(error.response.body)
    }
  }
}

export default sendEmail
