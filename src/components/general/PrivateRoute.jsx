import React from 'react'
import {Redirect} from 'react-router-dom'

const PrivateRoute = ({...rest }) => (
        rest.token
        ? rest.render()
        :
          <Redirect
            to={{
              pathname: "/login",
              state: { from: rest.location }
            }}
          />
)

export default PrivateRoute