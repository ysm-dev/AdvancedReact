import { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Form from './styles/Form'
import Error from './ErrorMessage'
import { CURRENT_USER_QUERY } from './User'

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      email
      name
    }
  }
`

export default class extends Component {
  state = {
    password: '',
    confirmPassword: ''
  }
  saveToState = ({ target: { name, value } }) => {
    this.setState({ [name]: value })
  }
  render() {
    return (
      <Mutation
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
        mutation={RESET_MUTATION}
        variables={{
          resetToken: this.props.resetToken,
          ...this.state
        }}
      >
        {(reset, { error, loading, called }) => {
          return (
            <Form
              method="post"
              onSubmit={async e => {
                e.preventDefault()
                await reset()
                this.setState({ password: '', confirmPassword: '' })
              }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Reset Your Password</h2>
                <Error error={error} />
                <label htmlFor="password">
                  Password
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={this.state.password}
                    onChange={this.saveToState}
                  />
                </label>
                <label htmlFor="confirmPassword">
                  ConfirmPassword
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="confirmPassword"
                    value={this.state.confirmPassword}
                    onChange={this.saveToState}
                  />
                </label>
                <button type="submit">Reset Password!</button>
              </fieldset>
            </Form>
          )
        }}
      </Mutation>
    )
  }
}
