import React, {useState} from 'react'
import addToMailchimp from 'gatsby-plugin-mailchimp';
import styled from 'styled-components';

import { Heading } from 'components/foundations'
import { colors, space, breakpoints } from 'utils/variables'

/**
 * TODO:
 * move this out of footer since
 * its used on community page also
 *
 */

 interface EmailFormProps {
   inputColor: string
   textColor: string
   cta: string
   btnColor: string
   btnTextColor: string
   isFooter: boolean
 }

const EmailForm = (props: EmailFormProps) => {
  const  [ email, setEmail ] = useState('')
  const [ isEntering, setIsEntering] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(email)
    e.preventDefault();
    addToMailchimp(email)
      .then((data) => {
        alert(data.msg);
      })
      .catch((error: Error) => {
        // Errors in here are client side
        // Mailchimp always returns a 200
        if (error.message === 'Timeout') {
          alert('Looks like your browser is blocking this. Try to disable any tracker-blocking feature and resubmit.')
        }
        console.error(error)
      });
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsEntering(true)
    setEmail(event.currentTarget.value);
  };

  return (
    <StyledForm inputColor={props.inputColor} textColor={props.textColor} onSubmit={handleSubmit} >
      <Heading as="h3" size="h3">{props.cta}</Heading>

      {
        props.isFooter ?
        isEntering  &&
        <StyledButton btnColor={props.btnColor} type="submit">
          <Heading as="h5" size="label" color={`${props.btnTextColor}`}>
            Subscribe
          </Heading>
        </StyledButton>
        :
        <StyledButton btnColor={props.btnColor} type="submit">
          <Heading as="h5" size="label" color={`${props.btnTextColor}`}>
            Subscribe
          </Heading>
        </StyledButton>
      }
        <input
          placeholder="Your email..."
          name="email"
          type="text"
          onChange={handleEmailChange}
          onFocus={handleEmailChange}
        />

    </StyledForm>
  );

}

EmailForm.defaultProps = {
  inputColor: "#B13617",
  textColor: colors.mintChocoChip,
  cta: 'Stay in touch 👉',
  btnColor: colors.seafoam,
  btnTextColor: colors.hunterOrange,
  isFooter: false
}

export default EmailForm

interface StyledFormProps {
  inputColor: string
  textColor: string
}

const StyledForm= styled('form')<StyledFormProps>`
  padding: ${space.xSmallDesktop}px 0;
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-template-rows: auto;
  grid-template-areas:
    "cta btn"
    "input input";
  h3 {
    grid-area: cta;
    align-self: center;
    margin-right: 12px;
  }
  input {
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.15);
    grid-area: input;
    border: 0;
    border-radius: 0.25rem;
    background: ${p => p.inputColor};
    color: ${p => p.textColor};
    font-family: system-ui, sans-serif;
    font-size: 1rem;
    line-height: 1.2;
    white-space: nowrap;
    text-decoration: none;
    cursor: pointer;
    height: 40px;
    width: 100%;
    padding: 0 18px;
    margin-top: ${space.xSmallDesktop}px;
    font-family: 'tuner-regular';
    font-size: 16px;
    ::placeholder {
      color: ${p => p.textColor};
      opacity: 1;
      font-family: 'tuner-regular';
      font-size: 16px;
      transition: opacity 200ms ease;
    }
    :active,
    :focus {
      ::placeholder {
        opacity: .5;
        transition: opacity 200ms ease;
      }
    }
  }
  @media(min-width: ${breakpoints.lg}px) {
    padding: 10px 0;
    display: grid;
    grid-template-columns: repeat(3, auto);
    grid-template-areas:"cta input btn";
    grid-column-gap: ${space.xSmallDesktop}px;
    input {
      margin: 0;
      width: revert;
    }
    h3 {
      font-size: 18px;
      margin-right: 0;
    }
  }
`

interface StyledButtonProps {
  btnColor: string
}

const StyledButton = styled('button')<StyledButtonProps>`
  justify-self: end;
  grid-area: btn;
  width: max-content;
  filter: drop-shadow(1px 2px 18px rgb(0,0,0,12%));
  transition: filter 250ms ease;
  display: flex;
  align-items: center;
  background-color: ${p => p.btnColor};
  border-radius: 100px;
  border: 0;
  white-space: no-wrap;
  text-decoration: none;
  text-transform: uppercase;
  height: 40px;
  padding: 0;
  :hover,
  :focus {
    text-decoration: none;
    filter: drop-shadow(1px 5px 18px rgb(0,0,0,25%));
    transition: filter 250ms ease;
  }
  h5 {
    padding: 0 ${space.md}px;
  }
`

