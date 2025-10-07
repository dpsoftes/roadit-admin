/**
 * Barrel export para DTOs
 * Todos los DTOs basados exactamente en los serializers de Django
 */

// Base
export * from './base.dto';

// Auth
export * from './auth.dto';

// User Management
export * from './admin.dto';
export * from './driver.dto';
export * from './user.dto';

// Client Management
export * from './client.dto';
export * from './clientGroup.dto';

// Transport & Logistics
export * from './anomaly.dto';
export * from './budget.dto';
export * from './leg.dto';
export * from './transport.dto';
export * from './vehicle.dto';

// Services
export * from './additionalService.dto';

// Content Management
export * from './protocol.dto';
export * from './tag.dto';
export * from './template.dto';

// Operations
export * from './certification.dto';
export * from './document.dto';
export * from './exam.dto';
export * from './incidence.dto';

// Financial
export * from './additionalCost.dto';
export * from './adjustment.dto';
export * from './billingAccount.dto';
export * from './invoice.dto';
export * from './priceRules.dto';

// Access Control
// importaciones desde '@dtos' (actualizado)

// Events
export * from './event.dto';
