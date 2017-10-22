import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import configureStore from '../configureStore'
import AsyncApp from './AsyncApp'
import Comments from './Comments'
import '../App.css'

const store = configureStore()

export default class Root extends Component {
    render () {
        return (
            <Provider store={store}r>
                <Router>
                    <div>
                        <Route exact path="/" component={AsyncApp} />
                        <Route exact path="/comments" component={Comments} />
                    </div>
                </Router>
            </Provider>
        )
    }
}
