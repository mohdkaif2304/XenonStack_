import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { MailboxIcon, MapPinIcon, PhoneIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='min-h-screen w-full flex flex-col bg-gray-50'>
        
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 my-auto bg-gray-100">
      <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Get in touch</h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            Have a question or need help? Fill out the form below and we&apos;ll get back to you as soon as possible.
          </p>
          <dl className="mt-8 space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <PhoneIcon className="h-6 w-6 text-gray-400 dark:text-gray-500" />
              </div>
              <div className="ml-3">
                <dt className="text-base font-medium text-gray-900 dark:text-gray-100">Phone</dt>
                <dd className="text-base text-gray-500 dark:text-gray-400">+91 7978016118</dd>
                <dd className="text-base text-gray-500 dark:text-gray-400">+91 6200578212</dd>
                <dd className="text-base text-gray-500 dark:text-gray-400">+91 third person</dd>


              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <MailboxIcon className="h-6 w-6 text-gray-400 dark:text-gray-500" />
              </div>
              <div className="ml-3">
                <dt className="text-base font-medium text-gray-900 dark:text-gray-100">Email</dt>
                <dd className="text-base text-gray-500 dark:text-gray-400">contact@EstateNex.com</dd>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <MapPinIcon className="h-6 w-6 text-gray-400 dark:text-gray-500" />
              </div>
              <div className="ml-3">
                <dt className="text-base font-medium text-gray-900 dark:text-gray-100">Address</dt>
                <dd className="text-base text-gray-500 dark:text-gray-400">Chandigarh University, Mohali, Punjab</dd>
              </div>
              
            </div>
          </dl>
          <div className="sm:col-span-2 mt-2">
              
<Button asChild className="w-full bg-green-600 hover:bg-green-500" type="submit">
                <Link href="https://wa.me/917978016118?text=Hello Ma'am, I need a pg near " target='_blank'>Book with WhatsApp</Link>
              </Button>
            </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Send us a message</h2>
          <form action="#" className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8" method="POST">
            <div>
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="first-name">
                First name
              </Label>
              <div className="mt-1">
                <Input
                  autoComplete="given-name"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  id="first-name"
                  name="first-name"
                  type="text"
                />
              </div>
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="last-name">
                Last name
              </Label>
              <div className="mt-1">
                <Input
                  autoComplete="family-name"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  id="last-name"
                  name="last-name"
                  type="text"
                />
              </div>
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="email">
                Email
              </Label>
              <div className="mt-1">
                <Input
                  autoComplete="email"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  id="email"
                  name="email"
                  type="email"
                />
              </div>
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="phone">
                Phone
              </Label>
              <div className="mt-1">
                <Input
                  autoComplete="tel"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  id="phone"
                  name="phone"
                  type="tel"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="message">
                Message
              </Label>
              <div className="mt-1">
                <Textarea
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  defaultValue=""
                  id="message"
                  name="message"
                  rows={4}
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <Button className="w-full" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  )
}

export default page