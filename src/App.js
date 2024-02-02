import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import Jobs from './components/Jobs'
import JobItemDetailsRoute from './components/JobItemDetailsRoute'
import NotFound from './components/NotFound'
import './App.css'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={LoginForm} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute
          exact
          path="/jobs/:id"
          component={JobItemDetailsRoute}
        />
        <ProtectedRoute exact path="/jobs" component={Jobs} />
        <Route component={NotFound} />
      </Switch>
    )
  }
}

export default App
