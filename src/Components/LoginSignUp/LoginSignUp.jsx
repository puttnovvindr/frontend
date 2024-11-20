import React, { useState } from 'react';
import './LoginSignUp.css';

export const LoginSignUp = () => {
  const [action, setAction] = useState("Sign Up");
  const [showTerms, setShowTerms] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const handleTermsClick = (e) => {
    e.preventDefault();
    setShowTerms(!showTerms);
  };
  const [error, setError] = useState('');
  const handleSignUp = () => {
    // validasi checked box
    if(!isChecked) {
      setError("You must agree with the Terms and Conditions.");
      return;
    }
    setError(''); 
    console.log('Sign Up successful!');
  };
  const handleSignIn = () => {
    if(!isChecked) {
      setError("You must agree with the Terms and Conditions.");
      return;
    }
    setError(''); 
    console.log('Sign In successful!');
  };

  return (
    <div style={{ 
      backgroundImage: `url('/BlueBlur.svg')`,
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      backgroundRepeat: 'no-repeat', 
      height: '100vh', 
      margin: 0, 
      padding: 0 
    }}>
      <div className="container-sign-in">
        
      </div>
      <div className={action === "Login" ? "title-message-login" : "title-message"}>
        {action === "Login" ? (
          <>
            <h1>Log In and Boost Your Productivity</h1>
            <p>
              Unlock powerful tools and features designed to help you stay focused, manage your time efficiently, 
              and achieve your goals faster. By accessing your account, you'll take the first step towards a more 
              productive and successful day!
            </p>
          </>
        ) : (
          <>
            <h1>Discover New <br /> Horizons</h1>
            <p>
              Sign up now to unlock full access to all our features! Join us and 
              start your journey today. Don't miss out on this opportunity to explore 
              everything we have to offer. Join us today and embark on your exciting 
              journey toward your goals!
            </p>
          </>
        )}
      </div>

      {/* Sign Up Page */}
      {action === "Sign Up" && (
        <div className="container signup-container">
          <div className="header">
            <div className="text">{action}</div>
          </div>
          <div className="inputs">
            <div className="input">
              <input type="text" placeholder="Name" />
            </div>
            <div className="input">
              <input type="text" placeholder="Username" pattern="[A-Za-z0-9]+" />
            </div>
            <div className="input">
              <input type="email" placeholder="Email" />
            </div>
            <div className="input">
              <input type="password" placeholder="Password" />
            </div>
            <div className="input">
              <input type="password" placeholder="Confirm Password" />
            </div>
            <div className="input">
              <input type="tel" placeholder="Phone Number" />
            </div>
            <div className="checkbox">
            <input type="checkbox" id="terms" className="round-checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
            <label htmlFor="terms">I agree with <span className='terms-link' onClick={handleTermsClick}>Terms and Conditions</span></label>
            </div>
          </div>

          {/* error message if user don't agree with tc */}
          {error && <p className="error-message">{error}</p>}

          <div className="signup-footer">
            <div className="submit-container">
            <div className="submit" onClick={handleSignUp}>Sign Up</div>
            </div>
            <div className="to-login-page">
              <p>Do you have an account? <span onClick={() => setAction("Login")} className="login-link">Sign In</span></p>
            </div>
          </div>
        </div>
      )}

      {/* Sign In Page */}
      {action === "Login" && (
        <div className="container login-container">
          <div className="header">
            <div className="text">Sign In</div>
          </div>
          <div className="inputs-login">
            <div className="input-login">
              <input type="email" placeholder="Email" />
            </div>
            <div className="input-login">
              <input type="password" placeholder="Password" />
            </div>
          </div>

          <div className="checkbox">
            <input type="checkbox" id="terms" className="round-checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
            <label htmlFor="terms">I agree with <a href="/terms-and-conditions" className="terms-link" onClick={handleTermsClick}>Terms and Conditions</a></label>
          </div>

          <div className="submit-container">
            <div className={`submit ${!isChecked ? 'disabled' : ''}`}onClick={isChecked ? handleSignIn : null}>Sign In</div>
          </div>
          <div className="to-signup-page">
            <p>Don’t have an account yet? <span onClick={() => setAction("Sign Up")} className="signup-link">Sign Up</span></p>
          </div>
        </div>
      )}

      {/* Terms and Condition */}
      {showTerms && (
        <div className="terms-modal">
          <div className="modal-content">
            <span className='close' onClick={handleTermsClick}>&times;</span>
            <h2>Taskspring Terms of Service</h2>
            <h5>Effective Date: October 11, 2024</h5>
            <p>This Terms of Service ("Agreement") constitutes a legally binding agreement between you ("you" or "Subscriber") and PonziScheme ("we," "us," or "Taskspring"), a company located in Jakarta, Indonesia, governing your use and access to the Taskspring mobile application ("Application") and the software and services made available through the Application (collectively, the "Services").
              <br />By clicking the "I Agree to the Terms of Service and Privacy Policy" box or (i) accessing or using any part of the Application or (ii) initiating any transaction on the Application, you agree to be bound by this Agreement.
              <br /> <br />This Agreement includes provisions for binding arbitration on an individual basis.
              <br /> <br />1. Definitions. The following terms have the following meanings:
              <br /><br />1.1 Authorized Users: Individuals invited and authorized by Subscriber to access and use the Services through your Taskspring account.
                    <br />1.2 Content: All text, data, code, software, graphics, information, images, audio, visual or audiovisual combinations, or other materials submitted, uploaded, imported, communicated, or exchanged with Subscriber to facilitate the provision of Services under this Agreement.
                    <br />1.3 Subscriber Data: Content submitted, uploaded, imported, integrated, communicated, or exchanged through the Application by Subscriber or its Authorized Users.
                    <br />1.4 Service Data: Aggregated, processed, derivative, statistical, and/or other benchmark data generated and/or extracted from Subscriber Data, Content, and metadata by Taskspring for analytics and other information processing purposes.
                    <br />1.5 Subscription: The subscription plan purchased by Subscriber on the Application.
                    <br />1.6 Subscription Fees: The fees associated with the Subscription Services.
              <br /><br />2. Services. Taskspring will provide Services to Subscriber in accordance with the terms and conditions of the Subscription selected by Subscriber on the Application. Taskspring may, from time to time, issue updated versions of its software and Services. You consent to such automatic updates and agree that this Agreement will apply to all such updates.
              <br /><br />3. Your Taskspring Account. To be eligible to use the Services, you must be at least 18 years of age and/or have the legal capacity to enter into a binding contract in your country of residence, create an online account, and accept this Agreement. By creating an account, you consent to receive all communications regarding any activity related to the Application and/or Services by email, in-app notifications, or other forms of electronic or digital communication.
              <br /><br />4. Account Security. Access by Subscriber and Authorized Users is subject to the terms and conditions of this Agreement. Subscriber is responsible for maintaining the confidentiality and security of account login information and is responsible for any and all activities that occur under Subscriber’s account. Subscriber must immediately notify Taskspring at info@taskspring.net of any change in authorization, any unauthorized use of your account or username, or other account-related security breach of which you are aware. Taskspring shall not be liable for any loss or damage arising from the failure of any user to keep your password or account secure.
              <br /><br />5. Authorized User Access. Subscriber is responsible for all Authorized User communications:
              <br /><br />5.1 Policy and Practices: Establishing and communicating Subscriber’s policy and practices regarding Authorized Users' access and utilization of the Services, including the use and dissemination of unique URLs generated by Taskspring. This includes, but is not limited to, notice that Authorized Users should not share URLs with any third party.
                    <br />5.2 Disabling Authorized User Accounts: If an Authorized User is no longer employed by Subscriber or is no longer eligible to access the Services, Subscriber must disable the Authorized User on Subscriber’s team member page to ensure communications are no longer sent. Until Subscriber disables an Authorized User, Authorized Users will continue to receive team-related communications through the Service.
              <br /><br />6. Use Restrictions. Subscriber will not, directly or indirectly, reverse engineer, decompile, disassemble, or otherwise attempt to discover the source code, object code, or underlying structure, ideas, know-how, or algorithms relevant to the Services or any software, documentation, or data related to the Services. Subscriber will not make the Services available for the benefit of any third party, or sell, resell, license, sublicense, distribute, rent, or lease the Services to any third party for any purpose, commercial or otherwise.
              <br /><br />7. End User License Agreement. Taskspring hereby grants Subscriber a limited, non-exclusive, non-sublicensable, non-transferable, non-assignable, revocable license during the Subscription Term to access and utilize the Services pursuant to the terms of the Subscription Plan purchased by Subscriber. Unless otherwise stated herein, nothing in this Agreement or use of the Application and Services gives Subscriber or its Authorized Users a right or license to use any of Taskspring’s copyrights, trade names, trademarks, service marks, logos, domain names, or any other intellectual property rights.
              <br /><br />8. Service Data Ownership. Taskspring expends significant resources gathering, assembling, and compiling the Service Data, and such Service Data constitutes an original compilation protected by Indonesian copyright laws. Taskspring shall retain all right, title, and interest in any Service Data created, generated, and/or derived from your use of the Services. Taskspring shall retain the unrestricted right, in its sole and absolute discretion, to utilize such Service Data for any purpose whatsoever, both commercial and non-commercial, without compensation or accounting to you. If Taskspring does not automatically own any Service Data upon its creation, you hereby assign all right, title, and interest in and to such Service Data to Taskspring.
              <br /><br />9. Subscriber Data License. Subscriber hereby grants to Taskspring a non-exclusive, perpetual, sublicensable, irrevocable, royalty-free, worldwide right and license to collect, process, store, host, copy, transmit, display, distribute, disseminate, modify, and create derivative works of any and all Subscriber Data for (a) the purposes of providing the Services, and (b) to perform analytics or other statistical or benchmark analysis on anonymized Service Data at the aggregate level.
              <br /><br />10. Trademark/Logo License. Subscriber grants to Taskspring a license to use Subscriber’s company name, logo, and/or relevant trademarks ("Properties") (a) to market and promote the Services, and/or (b) upon Subscriber’s request, to customize Subscriber’s dashboard or Service-related communications to Authorized Users with its own company names and applicable logos. This includes the worldwide right to copy, translate, broadcast, transmit, distribute, exhibit, perform, publish, and display the Properties as incorporated into Taskspring’s marketing and promotional materials. Permission to use the Properties may be terminated at any time upon thirty (30) days' prior written notice to Taskspring at info@taskspring.net.
              <br /><br />11. Feedback License. We consider any suggestions, ideas, proposals, testimonials, or other material submitted by users, whether solicited or unsolicited (collectively, the "Feedback"), to be non-confidential and non-proprietary. We shall not be liable for the disclosure, use, or exploitation of such Feedback. You hereby grant to Taskspring a worldwide, non-exclusive, perpetual, irrevocable, royalty-free, and transferable right and license to incorporate, use, publish, and exploit the Feedback for any purpose whatsoever, commercial or otherwise, without compensation or accounting.
              <br /><br />12. Free Trial. If Subscriber has initiated a free trial subscription ("Free Trial"), the Subscription Services will be available to Subscriber free of charge until the earlier of (a) the date on which your Free Trial subscription expires or is terminated, or (b) the start date of your paid Subscription plan. Paid Subscriptions are subject to the terms and conditions in effect upon purchase of the applicable Subscription.
              <br /><br />13. Subscription Fees and Term.
                    <br />Payment: You expressly authorize us to charge the applicable Subscription Fees pursuant to the authorized payment method selected by you on the Application. The payment model for Taskspring is subscription-based.
                    <br /><br />Late Payments: In the event Taskspring is unable to process payment of the applicable fees, Taskspring reserves the right to suspend or terminate services for payments that are more than fifteen (15) days past due. Past due payments will accrue interest at the greater of 1.5% monthly or the highest interest rate allowable under applicable law.
                    <br /><br />Subscription Term: The term of the subscription will commence on the date the Subscription is purchased and shall continue for the periodic subscription term chosen by you on the Platform ("Subscription Term"), and any renewal thereof, until terminated pursuant to this Agreement.
                    <br /><br />No Refunds: Taskspring does not have a refund policy. Fees paid for the Subscription Term will not be prorated upon cancellation and/or termination.
              <br /><br />14. Subscription Automatic Renewal. YOUR SUBSCRIPTION WILL AUTOMATICALLY RENEW AT THE END OF EACH SUBSCRIPTION TERM FOR A SUBSEQUENT SUBSCRIPTION TERM. YOU ACKNOWLEDGE AND AGREE AS FOLLOWS:
                    <br /><br />Notice of Cancellation Required: You agree that we may automatically renew your subscription and charge your account on the last day of your Subscription Term (the "Renewal Date"), unless you cancel your subscription before the Renewal Date.
                    <br /><br />Payment and Price: The renewal payment is due on the Renewal Date and will automatically be charged to the payment mechanism utilized by you for the original Subscription or the most recent renewal. The renewal price will be the current rate then in effect at the time of renewal. You will receive notice prior to renewal of any changes in Subscription Fees or this Agreement.
                    <br /><br />How to Cancel Automatic Renewal: If you do not want to renew, you must cancel your subscription by email and dashboard (if available) before the Renewal Date.
              <br /><br />15. Termination 
              <br />Automatic Termination: This Agreement shall automatically terminate upon the bankruptcy or insolvency of either party.
                    <br /><br />Breach: Either party may terminate this Agreement if the other party breaches any material provision of this Agreement.
                    <br /><br />Survival: The following Sections survive termination of this Agreement: Individual Arbitration, Feedback License, Subscriber Promotional License, Subscriber Data License, Confidentiality & Non-Disclosure, Disclaimer of Warranties, Disclaimer of Third-Party Conduct, Limitation of Liability, Indemnity, and Governing Law.
              <br /><br />16. Confidentiality & Non-Disclosure. Taskspring may have access to Subscriber’s confidential and proprietary Subscriber Data in providing and supporting the Services to Subscriber ("Confidential Information"). Taskspring shall not disclose any Confidential Information to any third party for any reason without your prior written consent. Taskspring will not disclose any Confidential Information to any person or entity other than its employees or agents/third parties who have a need to know about such information in order to provide the Services. In the event Taskspring is requested or required by legal process to disclose any of the Confidential Information, Taskspring shall, to the extent not prohibited by applicable law, give you prompt notice so that you may seek a protective order or other appropriate relief prior to any such disclosure.
              <br /><br />17. Security and Privacy. Taskspring shall protect the security of Confidential Information pursuant to commercially acceptable standards, but in no case less than reasonable care. Taskspring will implement, maintain, and use appropriate administrative, technical, and physical security measures to preserve the confidentiality, integrity, and availability of the Confidential Information in accordance with its Security Policy. Taskspring will only use personal information in accordance with its Privacy Policy.  You can review our Privacy Policy at [Link to Privacy Policy].
              <br /><br />18. Backup Data Responsibility. It is Subscriber’s responsibility to backup all Subscriber Data to preserve such Subscriber Data in the event of termination or to otherwise prevent potential data loss.
              <br /><br />19. Representations and Warranties. Subscriber represents and warrants that Subscriber is at least 18 years of age and/or has the legal capacity to form a binding contract in Subscriber’s country of residence. If Subscriber is registering on behalf of a corporate entity, Subscriber represents and warrants that he/she is authorized to enter into and bind the entity to this Agreement.
              <br /><br />20. Export Compliance. Services may be subject to export laws and regulations of Indonesia and other jurisdictions. Subscriber represents and warrants that it is not named on any Indonesian government denied-party list. Subscriber shall not permit access to or use any Services in an Indonesian embargoed country or in violation of any Indonesian export law or regulation.
              <br /><br />21. Individual Arbitration. EXCEPT AS OTHERWISE STATED HEREIN, any claim or controversy with Taskspring arising out of or relating to the Application, Services, and/or this Agreement (including its formation, interpretation, performance, and breach) shall be settled by binding arbitration administered by the Badan Arbitrase Nasional Indonesia (BANI) in accordance with its Commercial Arbitration Rules. Any judgment on the award rendered by the arbitrator(s) may be entered in any court having jurisdiction thereof.  Indonesian Arbitration Law will govern the interpretation and enforcement of this Agreement.
              <br /><br />ANY ARBITRATION UNDER THIS AGREEMENT WILL BE ON AN INDIVIDUAL BASIS ONLY. THE PARTIES EXPRESSLY WAIVE THEIR RIGHT TO FILE OR JOIN A CLASS ACTION OR PRIVATE ATTORNEY GENERAL ACTION, OR TO CONSOLIDATE THEIR ARBITRATION WITH OTHER ARBITRATIONS.
              <br /><br />The BANI’s rules, as well as forms for initiating arbitration proceedings, are available at [BANI Website]. When initiating a request to arbitrate with the BANI, you must also send a copy of the completed form to: info@taskspring.net.
              <br /><br />22. Exception – Small Claims Court Claims. Notwithstanding the parties’ agreement to resolve all disputes through arbitration, either party may seek relief in small claims courts for disputes or claims within the scope of that court’s jurisdiction.
              <br /><br />23. DISCLAIMER OF WARRANTIES: <br />TO THE EXTENT PERMITTED BY APPLICABLE LAW, THE APPLICATION AND SERVICES INCLUDED ON OR OTHERWISE MADE AVAILABLE TO YOU THROUGH THIS AGREEMENT, INCLUDING ANY FREE TRIAL SERVICES OR “BETA” RELEASES, ARE PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS. TASKSPRING DOES NOT REPRESENT OR WARRANT THAT THE APPLICATION OR SERVICES <br />(I) WILL BE UNINTERRUPTED, TIMELY, OR SECURE, <br />(II) WILL BE FREE OF DEFECTS, INACCURACIES, OR ERRORS, <br />(III) WILL MEET YOUR REQUIREMENTS, OR <br />(IV) WILL OPERATE IN THE CONFIGURATION OR WITH OTHER HARDWARE OR SOFTWARE YOU USE. EXCEPT WHERE PROHIBITED BY LAW, TASKSPRING EXPRESSLY DISCLAIMS ANY AND ALL REPRESENTATIONS, WARRANTIES, OR CONDITIONS OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, AND NON-INFRINGEMENT AND WILL NOT BE LIABLE FOR YOUR USE OF OR RELIANCE ON THE APPLICATION, INFORMATION, CONTENT, MATERIALS, PRODUCTS, AND SERVICES.
              <br /><br />24. DISCLAIMER OF THIRD-PARTY CONDUCT: <br />TASKSPRING DISCLAIMS ANY AND ALL LIABILITY FOR THE ACTS, OMISSIONS, AND CONDUCT OF ANY THIRD PARTIES (INCLUDING AUTHORIZED USERS) IN CONNECTION WITH OR RELATED TO YOUR USE OF THE APPLICATION OR SERVICES. TO THE EXTENT PERMITTED BY APPLICABLE LAW, TASKSPRING MAKES NO WARRANTIES REGARDING THIRD-PARTY SERVICES, ACTIVITY, GOODS, RESOURCES, AND INFORMATION, INCLUDING, WITHOUT LIMITATION, WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, AND NON-INFRINGEMENT AND WILL NOT BE LIABLE FOR YOUR USE OF OR RELIANCE ON SUCH THIRD-PARTY SERVICES, GOODS, RESOURCES, OR INFORMATION.
              <br /><br />25. LIMITATION OF LIABILITY. YOU EXPRESSLY AGREE THAT YOUR USE OF THE APPLICATION AND SERVICES IS AT YOUR SOLE RISK. TO THE EXTENT PERMITTED BY APPLICABLE LAW, NEITHER TASKSPRING NOR ANY OTHER PARTY INVOLVED IN CREATING, PRODUCING, OR DELIVERING THE APPLICATION OR SERVICES WILL BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY CONSEQUENTIAL, INCIDENTAL, INDIRECT, EXEMPLARY, PUNITIVE, OR SPECIAL DAMAGES (INCLUDING DAMAGES FOR LOST PROFITS, SECURITY BREACH, LOST DATA, OR LOSS OF GOODWILL) ARISING OUT OF, RELATING TO, OR CONNECTED WITH THE USE OF THE APPLICATION AND SERVICES, EVEN IF TASKSPRING HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. TO THE EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT WILL TASKSPRING’S AGGREGATE LIABILITY, OR THAT OF ITS OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF, OR INABILITY TO USE, THE APPLICATION OR SERVICES, EXCEED THE FEES PAID TO TASKSPRING IN THE THREE (3) MONTHS PRIOR TO THE EVENT GIVING RISE TO YOUR CLAIM.
              <br /><br />26. INDEMNITY. To the maximum extent permitted by law, Subscriber agrees to indemnify, defend, and hold harmless Taskspring, and its subsidiaries, affiliates, officers, directors, shareholders, employees, representatives, agents, volunteers, attorneys, managers, licensors, business partners, and each of their respective successors and assigns (the "Indemnified Parties") from and against all damages, losses, liabilities, claims, expenses, fees, or costs (including, without limitation, reasonable attorneys' fees and costs) incurred in connection with any claim, demand, or action brought or asserted against any of the Indemnified Parties arising out of or relating to Subscriber’s (i) use of the Application or Services, (ii) breach of this Agreement, (iii) violation of any third-party right, including without limitation any intellectual property right, publicity, property, or privacy right, and/or (iv) a breach of Subscriber’s representations or warranties under this Agreement.
              <br /><br />27. Miscellaneous Provisions: 
                    <br />  Severability. The validity or unenforceability of any provision of this Agreement shall not affect the validity or enforceability of any other provision of this Agreement.
                            Modifications. No modification of this Agreement shall be effective unless it is in writing and either signed by an authorized representative of Taskspring or posted on this Application by Taskspring.
                            Choice of Law. This Agreement shall be governed by and construed and enforced in accordance with the laws of the Republic of Indonesia. The parties consent to the jurisdiction of the Republic of Indonesia, and venue in Jakarta, with regard to any controversy or claim arising out of or relating to this Agreement, or the breach thereof.
                            Assignment. Subscriber shall not assign any of the rights or obligations under this Agreement without the prior written consent of Taskspring. However, consent is not required for an assignment of this Agreement in connection with a change of control, merger, stock transfer, sale, or other disposition of substantially all the assets of the Subscriber’s business.
                            Successors and Assigns. This Agreement is binding on and inures to the benefit of the parties and their respective successors and permitted assigns.
                            No Waiver. No failure or delay by a party exercising any right, power, or privilege under this Agreement will operate as a waiver thereof.
                            No Agency. No agency, partnership, joint venture, employee-employer, or franchisor-franchisee relationship is intended or created by this Agreement.
                            Interpretation. Headings are for reference purposes only and do not limit the scope or extent of such sections.
                            <br />Notices. All notices required or permitted to be given under this Agreement will be in writing and delivered to: Taskspring at info@taskspring.net or Subscriber at the email account associated with Subscriber’s Taskspring account.
                                  Entire Agreement. This Agreement comprises the entire agreement between the parties and supersedes all prior or contemporaneous agreements, written or oral, between the parties regarding the subject matter contained herein.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
