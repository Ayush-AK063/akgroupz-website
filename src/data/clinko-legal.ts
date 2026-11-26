// COPIED VERBATIM from earning-app/lib/legalContent.ts — keep in sync when the app's legal text changes.
// Single source of truth for the Privacy Policy and Terms of Service shown in-app
// (components/LegalDocumentModal.tsx). The hosted-ready HTML copies in legal/*.html are
// generated from this same content — IF YOU EDIT EITHER DOCUMENT HERE, UPDATE THE MATCHING
// HTML FILE TOO, and bump lastUpdated in both places.
//
// Operator identity, contact email, and jurisdiction below were provided
// by the owner on 2026-08-10 (see docx/PROGRESS.md). The contact email is expected to be
// monitored — IT Rules 2021 requires complaints to be acknowledged within 24 hours and
// resolved within 15 days.

export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

export interface LegalDocument {
  title: string;
  lastUpdated: string;
  intro: string[];
  sections: LegalSection[];
}

export const OPERATOR_NAME = 'AK Groupz';
export const CONTACT_EMAIL = 'clinko.support@gmail.com';

export const PRIVACY_POLICY: LegalDocument = {
  title: 'Privacy Policy',
  lastUpdated: '25 November 2026',
  intro: [
    `Clinko ("the App") is operated by ${OPERATOR_NAME} ("we", "us", "our"), based in India. Clinko is a rewards app where you play games, complete daily activities, and collect virtual Coins and Diamonds. Coins and Diamonds are not real money; they may be redeemed as a reward through vouchers, where available.`,
    'This Privacy Policy explains what personal data we collect, why we collect it, how we use and protect it, and the rights you have over it — including your rights under India’s Digital Personal Data Protection Act, 2023 (the "DPDP Act").',
    'By signing in and using Clinko, you consent to the collection and use of your information as described in this Policy. If you do not agree, please do not use the App.',
  ],
  sections: [
    {
      heading: '1. Information We Collect',
      paragraphs: [
        'Account information (from Google Sign-In). When you sign in with Google, we receive your name, email address, and Google profile photo. We do not receive your Google password.',
        'Profile information you provide. Your display name, username, country/nationality, any profile photo (avatar) you choose to upload, and the phone number, gender, and date of birth you choose to add.',
        'Redemption information. If you redeem your balance for a voucher, we collect the details needed to deliver that voucher. We collect these only to fulfil your redemption.',
        'Wallet and gameplay data. Your Coin and Diamond balances, every reward you earn, every transaction in your wallet, your game sessions and results, daily/hourly bonus claims, streaks, referral activity, and redemption requests and their status.',
        'Device and technical data. A random device identifier created on your device when you install the App (this is not a hardware serial number, advertising ID, or phone number), your device model name, operating system platform, IP address, sign-in timestamps, and a coarse, country-level location derived from your IP address (via a third-party IP-lookup service — see Section 5). We do not collect precise GPS location.',
        'Device security signals. To protect the rewards system against fraud, the App checks whether your device is rooted or jailbroken, whether developer mode or a debugger is active, whether a VPN or proxy is active (Android only), and whether the App is running on an emulator. These results are sent to our servers with each check.',
        'In-app notifications. Notifications we generate for you inside the App (for example, a new-device sign-in alert).',
        'Stored only on your device (not sent to us): your biometric-unlock preference and the locally generated device identifier are kept in your device’s local storage.',
      ],
    },
    {
      heading: '2. Information We Do NOT Collect',
      paragraphs: [
        'We do not collect your contacts, SMS messages, call logs, or precise location (GPS).',
        'We do not read your photo gallery — if you choose an avatar, only the single image you pick is uploaded.',
        'The App currently contains no third-party advertising or analytics SDKs. If we introduce advertising in the future, we will update this Policy first and the in-app disclosures will change accordingly.',
      ],
    },
    {
      heading: '3. How We Use Your Information',
      paragraphs: [
        'To operate the App: create and maintain your account and wallet, credit rewards you earn, run the games, and track streaks and bonuses.',
        'To process redemptions: verify your request, apply security checks, and deliver the voucher you selected.',
        'To keep the platform fair and secure: detect and prevent fraud, multi-account abuse, automated play, and tampered devices; maintain audit logs of account activity (including device identifier and IP address); and protect other users and ourselves.',
        'To run social features: display your name, avatar, and score on leaderboards, and operate the referral program.',
        'To communicate with you: in-app notifications such as security alerts, and responses to your support requests.',
        'To comply with law: including record-keeping requirements, and lawful requests from authorities.',
      ],
    },
    {
      heading: '4. What Other Users Can See',
      paragraphs: [
        'If you appear on a leaderboard, other users can see your display name, avatar, and score. They cannot see your email, balances, transactions, or device information.',
        'Avatar images are stored in a publicly readable storage location, which means anyone with the direct link to an avatar image can view it. Do not upload a photo you are not comfortable being publicly visible.',
      ],
    },
    {
      heading: '5. Who We Share Data With',
      paragraphs: [
        'We do not sell your personal data. We share data only with:',
        'Service providers (data processors): Supabase, which hosts our database, authentication, file storage, and server functions. Google, which provides the sign-in service. A third-party IP-lookup service, which we send your IP address to at login/device registration in order to derive a coarse, country-level location used solely for fraud detection (for example, flagging an account that appears active from two distant countries within an implausibly short time). These providers process data on our behalf under their own security and privacy commitments.',
        'Redemption processing: when we fulfil a voucher redemption, the details needed to deliver it are shared with the voucher provider.',
        'Legal requirements: we may disclose data where required by law, court order, or a competent government authority, or where necessary to investigate fraud or protect our legal rights.',
      ],
    },
    {
      heading: '6. Where Your Data Is Stored',
      paragraphs: [
        'Our backend is hosted on Supabase infrastructure located in Singapore (AWS Asia-Pacific region). This means your personal data is stored and processed outside India. We take this into account in how we protect your data, and such transfer is carried out in accordance with the DPDP Act.',
      ],
    },
    {
      heading: '7. How We Protect Your Data',
      paragraphs: [
        'All communication between the App and our servers is encrypted in transit (TLS), and the App additionally uses certificate pinning to protect against interception.',
        'All balance changes and rewards are decided and recorded on our servers, never by the app on your device. Database access is restricted so that each account can only read its own data.',
        'We keep audit logs of sensitive actions, monitor for fraud signals, and apply extra verification (such as email OTP) before allowing redemptions from a new device.',
        'No system is 100% secure. If a data breach occurs that affects your personal data, we will notify you and the Data Protection Board of India as required by the DPDP Act.',
      ],
    },
    {
      heading: '8. How Long We Keep Data',
      paragraphs: [
        'We keep your personal data for as long as your account exists.',
        'After account deletion, we delete your personal data, except records we are required or permitted to retain — such as redemption records and fraud/audit logs — which we keep for as long as needed for legal compliance, security, and fraud prevention, and then delete. We also keep a keyed hash of your email address, along with any account restrictions and the one-time rewards already claimed, so that restrictions cannot be bypassed and one-time rewards cannot be claimed again by creating a new account with the same email.',
      ],
    },
    {
      heading: '9. Your Rights (DPDP Act 2023)',
      paragraphs: [
        'You have the right to: access a summary of the personal data we hold about you; correct inaccurate or incomplete data; erase your personal data (subject to the retention exceptions in Section 8); withdraw your consent at any time (which may mean you can no longer use the App); have your grievances addressed; and nominate another person to exercise your rights if you are unable to.',
        `To exercise any of these rights, email us at ${CONTACT_EMAIL}. We will respond as required by law. You also have the right to complain to the Data Protection Board of India if you are not satisfied with our response.`,
      ],
    },
    {
      heading: '10. Account Deletion',
      paragraphs: [
        `You can delete your account and associated data at any time at https://akgroupz.in/products/clinko/account-deletion by confirming a code sent to the email address linked to your account. You can also email ${CONTACT_EMAIL} from that address, with the subject "Delete my account".`,
        'Deletion on the web page takes effect immediately; requests by email are completed within 30 days of verification. If a redemption has been approved or is being processed, you can delete your account once it is complete. Deletion is permanent: your remaining Coin/Diamond balances are forfeited and cannot be restored, and any unprocessed redemption requests are cancelled. Records described in Section 8 may be retained as permitted by law.',
      ],
    },
    {
      heading: '11. Children',
      paragraphs: [
        'Clinko is intended only for users who are 18 years of age or older. We do not knowingly collect personal data from anyone under 18. If we learn that an account belongs to a person under 18, we will terminate the account and delete its data.',
      ],
    },
    {
      heading: '12. Grievance Officer',
      paragraphs: [
        'In accordance with the Information Technology Act, 2000 and the IT Rules, 2021, and the DPDP Act, 2023, our grievance contact is:',
        `Grievance Officer, ${OPERATOR_NAME}\nEmail: ${CONTACT_EMAIL}\nNoida, Uttar Pradesh, India`,
        'We will acknowledge your complaint within 24 hours and resolve it within 15 days.',
      ],
    },
    {
      heading: '13. Changes to This Policy',
      paragraphs: [
        'We may update this Policy from time to time. If we make material changes, we will notify you in the App before the changes take effect. The "Last updated" date at the top shows the current version. Continued use of the App after changes take effect means you accept the updated Policy.',
      ],
    },
    {
      heading: '14. Contact Us',
      paragraphs: [
        `For any questions about this Policy or your data, contact us at ${CONTACT_EMAIL}.`,
      ],
    },
  ],
};

export const TERMS_OF_SERVICE: LegalDocument = {
  title: 'Terms of Service',
  lastUpdated: '25 November 2026',
  intro: [
    `These Terms of Service ("Terms") are an agreement between you and ${OPERATOR_NAME} ("we", "us", "our"), the operator of the Clinko mobile application ("the App").`,
    'By creating an account or using the App, you accept these Terms and our Privacy Policy. If you do not agree, do not use the App.',
  ],
  sections: [
    {
      heading: '1. Eligibility',
      paragraphs: [
        'You must be at least 18 years old, a resident of India, and legally capable of entering into a contract to use the App.',
        'You may hold only one account. Creating or operating multiple accounts — for yourself or on behalf of others — is prohibited and is grounds for termination and forfeiture of balances on all involved accounts.',
      ],
    },
    {
      heading: '2. Your Account',
      paragraphs: [
        'You sign in with your Google account. You are responsible for keeping your Google account and your device secure, and for all activity that happens under your Clinko account.',
        'You must provide accurate information, including any details required for a redemption. We are not responsible for a voucher delivered to incorrect details that you provided.',
      ],
    },
    {
      heading: '3. The Service — Free to Play',
      paragraphs: [
        'Clinko lets you collect virtual Coins and Diamonds by playing games, claiming daily and hourly bonuses, maintaining streaks, referring friends, completing tasks, and ranking on leaderboards.',
        'Clinko is entirely free to play. We never require or accept deposits, wagers, stakes, or purchases of any kind. Clinko is a rewards app, not a gambling or betting service.',
      ],
    },
    {
      heading: '4. Coins & Diamonds (Virtual Items)',
      paragraphs: [
        'Coins and Diamonds are virtual items. They are not real money, currency, or a deposit, have no monetary value, and remain our property. They cannot be bought, sold, transferred, exchanged outside the App, or inherited.',
        'Coins and Diamonds may be redeemed only as a reward through vouchers, where available in the App. The vouchers offered, the Coins or Diamonds required, and every reward amount and rule in the App may be changed, suspended, or discontinued by us at any time.',
        'Coins and Diamonds may also be used within the App (for example, to enter certain games). These uses may change over time.',
        'Reward amounts, milestones, or prizes shown anywhere in the App are current values only and do not constitute a promise of future rewards.',
      ],
    },
    {
      heading: '5. Voucher Redemption',
      paragraphs: [
        'To redeem a voucher, you need the required balance and a registered, verified device. Redemptions from a newly added device may require email verification and may be subject to a security cooldown period.',
        'Redemption requests are reviewed before a voucher is delivered. This is typically completed within 7–14 business days, and may take up to 30 days where additional verification is required. The required Coins or Diamonds are deducted when you submit the request.',
        'If we reject a redemption request (for example, because of a failed security review), the deducted Coins or Diamonds will be returned to your balance, unless the request was made in violation of these Terms (see Section 6).',
        'We may ask for information to verify your identity before delivering a voucher, where required by law. Vouchers are also subject to the terms of the voucher provider.',
      ],
    },
    {
      heading: '6. Fair Play — Prohibited Conduct',
      paragraphs: [
        'The following are strictly prohibited: operating more than one account; using bots, scripts, automation, or modified/tampered versions of the App; playing on emulators or rooted/jailbroken devices; exploiting bugs instead of reporting them; abusing the referral program (including self-referrals and fake accounts); misrepresenting your identity or device; and any attempt to manipulate rewards, games, or redemptions.',
        'If we determine, in our reasonable judgment, that you have violated this section: we may forfeit part or all of your Coin and Diamond balances (including pending redemptions), suspend or permanently ban your account and associated devices, and reverse rewards obtained through the violation. We may also report unlawful activity to authorities.',
        'We use automated security systems — including device integrity checks, device registration, and fraud-signal monitoring — to detect violations. We may block access from devices that fail security checks.',
      ],
    },
    {
      heading: '7. Referral Program',
      paragraphs: [
        'Referral rewards are Coins or Diamonds and are given only for genuine new users who join through your code and meet the reward conditions shown in the App. Referral abuse of any kind results in forfeiture of referral rewards and may lead to account termination.',
        'Referral reward amounts and conditions may change at any time.',
      ],
    },
    {
      heading: '8. Changes to the Service',
      paragraphs: [
        'We may add, change, suspend, or remove any feature, game, reward, or the entire service at any time, with or without notice. We do not guarantee the App will always be available or error-free.',
      ],
    },
    {
      heading: '9. Termination',
      paragraphs: [
        `You may stop using the App at any time and may delete your account at https://akgroupz.in/products/clinko/account-deletion or by emailing ${CONTACT_EMAIL} (see the Privacy Policy for the process). Deleting your account forfeits any remaining balances.`,
        'We may suspend or terminate your account if you violate these Terms, if we detect fraud or a security risk, or if required by law. Where termination is for a violation, balances may be forfeited under Section 6. Where we discontinue the service entirely, we will make reasonable efforts to give eligible users an opportunity to redeem qualifying balances before shutdown.',
      ],
    },
    {
      heading: '10. Intellectual Property',
      paragraphs: [
        'The App, including its name, logo, artwork, design, and software, belongs to us or our licensors. We grant you a limited, personal, non-transferable licence to use the App for its intended purpose. You may not copy, modify, distribute, reverse-engineer, or create derivative works from the App.',
      ],
    },
    {
      heading: '11. Disclaimers',
      paragraphs: [
        'The App is provided "as is" and "as available", without warranties of any kind, express or implied. We do not warrant that the App will be uninterrupted, secure, or free of errors, or that any level of rewards is achievable.',
      ],
    },
    {
      heading: '12. Limitation of Liability',
      paragraphs: [
        'To the maximum extent permitted by law, we are not liable for any indirect, incidental, special, or consequential damages, or for loss of profits, data, or goodwill, arising from your use of the App.',
        'Our total aggregate liability to you for all claims arising out of or relating to the App is limited to the value of your approved, undelivered voucher redemptions at the time the claim arose.',
      ],
    },
    {
      heading: '13. Indemnity',
      paragraphs: [
        'You agree to indemnify us against claims, losses, and expenses (including reasonable legal fees) arising from your violation of these Terms or misuse of the App.',
      ],
    },
    {
      heading: '14. Governing Law & Disputes',
      paragraphs: [
        'These Terms are governed by the laws of India. Subject to any mandatory law to the contrary, the courts at Noida, Uttar Pradesh, India shall have exclusive jurisdiction over disputes arising from these Terms or the App.',
      ],
    },
    {
      heading: '15. Grievance Officer',
      paragraphs: [
        `Complaints and grievances: Grievance Officer, ${OPERATOR_NAME}\nEmail: ${CONTACT_EMAIL}\nNoida, Uttar Pradesh, India`,
        'We will acknowledge complaints within 24 hours and resolve them within 15 days, in accordance with the IT Rules, 2021.',
      ],
    },
    {
      heading: '16. Changes to These Terms',
      paragraphs: [
        'We may update these Terms from time to time. Material changes will be notified in the App before they take effect. The "Last updated" date shows the current version. Continued use after changes take effect means you accept the updated Terms.',
      ],
    },
    {
      heading: '17. Contact',
      paragraphs: [
        `Questions about these Terms: ${CONTACT_EMAIL}.`,
      ],
    },
  ],
};
