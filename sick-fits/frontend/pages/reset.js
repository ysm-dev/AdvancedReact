import Reset from '../components/Reset'

export default props => (
  <div>
    <Reset resetToken={props.query.resetToken}>Reset your password</Reset>
  </div>
)
