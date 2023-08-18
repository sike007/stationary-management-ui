import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import Login from './components/Login';
import {BrowserRouter as Router} from 'react-router-dom';
import AdminSystem from './components/AdminSystem';
import Student from './components/Student';
import Transaction from './components/StudentTransactions';
import AdminReturnable from './components/AdminReturnable';

it('render Login page without crashing', () => {
  render(<Login />)
  expect(screen.getByRole('button')).toHaveTextContent('Sign in')
  expect(screen.getByRole('button')).toBeInTheDocument
  expect(screen.getByRole('login_page')).toBeInTheDocument
})

it('render Student Home page without crashing', async () => {
  render(
  <Router>
    <Student />
  </Router>
  )
  expect(screen.getByRole('grid1')).toBeInTheDocument
})
it('render Student Transaction page without crashing', async () => {
  render(
  <Router>
    <Transaction />
  </Router>,
  )
  expect(screen.getByRole('grid2')).toBeInTheDocument
})
it('render Admin Home page without crashing', async () => {
  render(
  <Router>
    <AdminSystem />
  </Router>,
  )
  expect(screen.getByRole('grid3')).toBeInTheDocument
})
it('render Admin Transaction page without crashing', async () => {
  render(
  <Router>
    <AdminReturnable />
  </Router>,
  )
  expect(screen.getByRole('grid4')).toBeInTheDocument
});