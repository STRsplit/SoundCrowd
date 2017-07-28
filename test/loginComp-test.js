import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import Login from '../src/components/Login.jsx';
import sinon from 'sinon'


describe('Login', function() {
  it('should render', function() {
    const wrapper = shallow(<Login/>);
    expect(wrapper.contains(
      <h1 className="login-title">SoundCrowd</h1>
    )).to.equal(true);
    expect(wrapper.find('.button-container').exists()).to.be.true
  });
  it('should have join room button', function() {
    const onButtonClick = sinon.spy()
    const wrapper = shallow(<Login/>);
    const JoinButton = wrapper.find('.button-container').at(0).find({label: 'Sign into Spotify'})
    expect(JoinButton.exists()).to.be.true
  });
  
});