import Script from 'next/script'

export default function TelegramAuth() {
	function onTelegramAuth(user: any) {
    alert('Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id + (user.username ? ', @' + user.username : '') + ')');
  }
  return (
    <>
      <Script src="https://telegram.org/js/telegram-widget.js?18" data-telegram-login="nootskz_bot" data-size="large" data-radius="10" data-onauth={onTelegramAuth} strategy="lazyOnload"/>
    </>
  )
}
{/* <script async src="https://telegram.org/js/telegram-widget.js?18" data-telegram-login="nootskz_bot" data-size="large" data-radius="10" data-onauth="onTelegramAuth(user)" data-request-access="write"></script>
<script type="text/javascript">
  function onTelegramAuth(user) {
    alert('Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id + (user.username ? ', @' + user.username : '') + ')');
  }
</script> */}