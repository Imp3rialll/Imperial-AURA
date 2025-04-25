'use client';


import { useState, useEffect } from 'react';

import { Smartphone, Monitor } from 'lucide-react';


type ViewMode = 'global' | 'mobile';


const STORAGE_KEY = 'imperial-aura-view-mode';
