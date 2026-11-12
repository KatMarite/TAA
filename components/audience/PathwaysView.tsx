'use client';

import React from 'react';
import { Course, CareerPathway } from '@/lib/academy-data';
import ResilientImage from '../ResilientImage';

export interface PathwaysViewProps {
  pathways: CareerPathway[];
  courses: Course[];
  onSelectCourse: (courseId: string) => void;
  onEnrolCourse: (course: Course) => void;
}

export function PathwaysView({
  pathways,
  courses,
  onSelectCourse,
  onEnrolCourse,
}: PathwaysViewProps) {
  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="pb-8 border-b border-[#E5E7EB]">
        <p className="text-xs font-semibold text-[#D91B24] mb-2">
          08. Career & Learning Pathways · Structured NQF Mobility
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1C1B1B] max-w-3xl">
          Map Your Career from Entry Operative to Supervisor or Business Owner
        </h1>
        <p className="mt-3 text-base text-[#52525B] max-w-2xl">
          Choose your desired occupational destination below to see the exact sequence of accredited modules, durations, and earning benchmarks.
        </p>
      </div>

      <div className="space-y-8">
        {pathways.map((pathway) => (
          <section
            key={pathway.id}
            className="bg-white border border-[#E5E7EB] rounded-xl p-6 sm:p-8"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#E5E7EB]">
              <div>
                <h2 className="text-xl font-bold text-[#1C1B1B]">
                  {pathway.title}
                </h2>
                <p className="text-sm text-[#52525B] mt-1">
                  {pathway.subtitle}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-6 text-xs text-[#52525B] shrink-0">
                <div>
                  <span className="block text-slate-400">Target Role</span>
                  <strong className="text-[#1C1B1B]">
                    {pathway.targetRole}
                  </strong>
                </div>
                <div>
                  <span className="block text-slate-400">
                    Typical Earnings / Revenue
                  </span>
                  <strong className="font-mono text-[#D91B24]">
                    {pathway.estimatedEarningsRange}
                  </strong>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {pathway.steps.map((step) => {
                const matchedCourse = courses.find(
                  (c) => c.id === step.courseId
                );
                return (
                  <div
                    key={step.stepNumber}
                    className="bg-[#FCF9F8] border border-[#E5E7EB] rounded-xl overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      {matchedCourse && (
                        <div className="aspect-video w-full bg-zinc-100 overflow-hidden">
                          <ResilientImage
                            src={matchedCourse.image}
                            alt={step.stageTitle}
                            fallbackTitle={step.stageTitle}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="p-5">
                        <div className="flex items-center justify-between text-xs text-[#52525B] mb-2">
                          <span className="font-mono font-bold text-[#D91B24]">
                            {step.stepNumber}
                          </span>
                          <span>{step.nqf}</span>
                        </div>
                        <h3 className="text-base font-bold text-[#1C1B1B]">
                          {step.stageTitle}
                        </h3>
                        <p className="text-xs text-[#52525B] mt-2">
                          {step.outcome}
                        </p>
                      </div>
                    </div>

                    {matchedCourse && (
                      <div className="px-5 pb-5 pt-4 border-t border-[#E5E7EB]/80 flex items-center justify-between">
                        <span className="font-mono text-sm font-bold text-[#1C1B1B] tabular-nums">
                          R{matchedCourse.priceZAR.toLocaleString('en-ZA')}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => onSelectCourse(matchedCourse.id)}
                            className="text-xs font-semibold text-[#1C1B1B] hover:underline cursor-pointer"
                          >
                            Curriculum
                          </button>
                          <button
                            type="button"
                            onClick={() => onEnrolCourse(matchedCourse)}
                            className="px-3 py-1.5 text-xs font-semibold text-white bg-[#D91B24] hover:bg-[#B91C1C] rounded-lg cursor-pointer"
                          >
                            Enrol
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

