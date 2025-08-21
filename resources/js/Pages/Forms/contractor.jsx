// resources/js/Pages/Forms/Contractor.jsx
import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Contractor() {
    return (
        <AuthenticatedLayout
            // header={
            //     <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            //         Contractor
            //     </h2>
            // }
        >
            <Head title="Contractor" />

            {/* <div className="py-6">
                <p>This is the Contractor page</p>
            </div> */}
        </AuthenticatedLayout>
    );
}
