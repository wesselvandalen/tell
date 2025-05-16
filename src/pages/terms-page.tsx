import Footer from "../components/footer";

export default function TermsPage() {
    return (
        <div className="mx-auto p-8">
            <h3 className="text-4xl font-bold text-gray-800 mb-4">Terms and Conditions</h3>

            <p className="mb-4">
                Welcome to our calorie tracking website. By using our
                website and services, you agree to these Terms and Conditions. If you do
                not agree, please do not use our services.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">1. Account Registration</h2>
            <p className="mb-4">
                To use our service, you must create an account through Google Authentication.
                You are responsible for maintaining the confidentiality of your account and
                ensuring all activity under your account complies with these terms.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">2. Use of Service</h2>
            <p className="mb-4">
                Our service allows you to track your daily caloric intake. You agree to use
                this service solely for personal, non-commercial purposes and not for
                any unlawful or harmful activities.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">3. Privacy and Data</h2>
            <p className="mb-4">
                By signing in with your Google account, you authorize us to access certain
                information such as your name and email address. We do not sell your data and
                take appropriate steps to protect your privacy. For more details, see our
                Privacy Policy.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">4. Termination</h2>
            <p className="mb-4">
                We reserve the right to suspend or terminate your account if you violate these
                terms or engage in any activity that harms our service or users.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">5. Changes to Terms</h2>
            <p className="mb-4">
                We may update these Terms and Conditions at any time. Continued use of the
                service after changes constitutes acceptance of the new terms.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">6. Contact Us</h2>
            <p className="mb-4">
                If you have questions about these Terms, please contact us at wesselvandalen@gmail.com.
            </p>

            <Footer/>
        </div>
    );
}