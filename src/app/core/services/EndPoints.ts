/**
 * Endpoints del API de RoadIt
 * Enum con todos los endpoints disponibles del backend Django
 */

export enum EndPoints {
    // ======================
    // AUTENTICACIÓN
    // ======================
    login = "/login/", // POST LoginRequestDto -> LoginResponseDto
    logout = "/logout/", // POST LogoutRequestDto -> ApiResponse
    refreshToken = "/token/refresh/", // POST RefreshTokenRequestDto -> RefreshTokenResponseDto

    // ======================
    // USUARIOS
    // ======================
    // Usuarios generales
    getUsers = "/users/", // GET -> PaginatedResponse<User>
    createUser = "/users/", // POST CreateUserRequestDto -> User
    getUser = "/users/{userId}/", // GET -> User
    updateUser = "/users/{userId}/", // PATCH UpdateUserRequestDto -> User
    deleteUser = "/users/{userId}/", // DELETE -> ApiResponse
    resetPassword = "/users/reset_password/", // POST ResetPasswordRequestDto -> ApiResponse
    changePassword = "/users/change_password/", // POST ChangePasswordRequestDto -> ApiResponse

    // Administradores
    getAdmins = "/admins/", // GET -> PaginatedResponse<User>
    createAdmin = "/admins/", // POST CreateUserRequestDto -> User
    getAdmin = "/admins/{adminId}/", // GET -> User
    updateAdmin = "/admins/{adminId}/", // PATCH UpdateUserRequestDto -> User
    deleteAdmin = "/admins/{adminId}/", // DELETE -> ApiResponse
    exportAdminsCSV = "/admins/export-csv/", // GET -> CSV file

    // Conductores
    getDrivers = "/drivers/", // GET -> PaginatedResponse<Driver>
    createDriver = "/drivers/", // POST CreateDriverRequestDto -> Driver
    getDriver = "/drivers/{driverId}/", // GET -> Driver
    updateDriver = "/drivers/{driverId}/", // PATCH UpdateDriverRequestDto -> Driver
    deleteDriver = "/drivers/{driverId}/", // DELETE -> ApiResponse
    exportDriversCSV = "/drivers/export-csv/", // GET -> CSV file

    // Usuarios de cliente
    getClientUsers = "/client-users/", // GET -> PaginatedResponse<ClientUser>
    createClientUser = "/client-users/", // POST CreateClientUserRequestDto -> ClientUser
    getClientUser = "/client-users/{clientUserId}/", // GET -> ClientUser
    updateClientUser = "/client-users/{clientUserId}/", // PATCH UpdateClientUserRequestDto -> ClientUser
    deleteClientUser = "/client-users/{clientUserId}/", // DELETE -> ApiResponse
    exportClientUsersCSV = "/client-users/export-csv/", // GET -> CSV file

    // ======================
    // CLIENTES
    // ======================
    getClients = "/clients/", // GET -> PaginatedResponse<Client>
    createClient = "/clients/", // POST CreateClientRequestDto -> Client
    getClient = "/clients/{clientId}/", // GET -> Client
    updateClient = "/clients/{clientId}/", // PATCH UpdateClientRequestDto -> Client
    deleteClient = "/clients/{clientId}/", // DELETE -> ApiResponse
    exportClientsCSV = "/clients/export-csv/", // GET -> CSV file

    // Grupos de clientes
    getClientGroups = "/clients-group/", // GET -> PaginatedResponse<ClientGroup>
    createClientGroup = "/clients-group/", // POST CreateClientGroupRequestDto -> ClientGroup
    getClientGroup = "/clients-group/{clientGroupId}/", // GET -> ClientGroup
    updateClientGroup = "/clients-group/{clientGroupId}/", // PATCH UpdateClientGroupRequestDto -> ClientGroup
    deleteClientGroup = "/clients-group/{clientGroupId}/", // DELETE -> ApiResponse

    // ======================
    // TRANSPORTES
    // ======================
    getTransports = "/transports/", // GET -> PaginatedResponse<Transport>
    createTransport = "/transports/", // POST CreateTransportRequestDto -> Transport
    getTransport = "/transports/{transportId}/", // GET -> Transport
    updateTransport = "/transports/{transportId}/", // PATCH UpdateTransportRequestDto -> Transport
    deleteTransport = "/transports/{transportId}/", // DELETE -> ApiResponse
    exportTransportsCSV = "/transports/export-csv/", // GET -> CSV file

    // Acciones específicas de transporte
    swapLegPoints = "/transports/{transportId}/swap-legpoints/", // POST SwapLegPointsRequestDto -> ApiResponse
    getTransportHistory = "/transports/history/", // GET -> PaginatedResponse<Transport>
    exportTransportHistoryCSV = "/transports/export-history-csv/", // GET -> CSV file
    cancelTransport = "/transports/{transportId}/cancel-transport/", // POST CancelTransportRequestDto -> ApiResponse
    finalizeTransport = "/transports/{transportId}/finalize/", // POST FinalizeTransportRequestDto -> ApiResponse
    upsertAdditionalServices = "/transports/{transportId}/additional-services/upsert/", // POST UpsertAdditionalServicesRequestDto -> ApiResponse
    changeLicensePlate = "/transports/{transportId}/change-license-plate/", // POST ChangeLicensePlateRequestDto -> ApiResponse
    blockMission = "/transports/{transportId}/block-mission/", // POST BlockMissionRequestDto -> ApiResponse
    duplicateTransport = "/transports/{transportId}/duplicate/", // POST DuplicateTransportRequestDto -> Transport
    addReturn = "/transports/{transportId}/add-return/", // POST AddReturnRequestDto -> ApiResponse
    unassignDriver = "/transports/{transportId}/unassign-driver/", // POST UnassignDriverRequestDto -> ApiResponse
    getTransportOverview = "/transports/{transportId}/overview/", // GET -> TransportOverviewDto

    // Direcciones de transporte
    getTransportAddresses = "/transport-address/", // GET -> PaginatedResponse<TransportAddress>
    createTransportAddress = "/transport-address/", // POST CreateTransportAddressRequestDto -> TransportAddress
    getTransportAddress = "/transport-address/{addressId}/", // GET -> TransportAddress
    updateTransportAddress = "/transport-address/{addressId}/", // PATCH UpdateTransportAddressRequestDto -> TransportAddress
    deleteTransportAddress = "/transport-address/{addressId}/", // DELETE -> ApiResponse

    // ======================
    // PRESUPUESTOS
    // ======================
    getBudgets = "/budgets/", // GET -> PaginatedResponse<Budget>
    createBudget = "/budgets/", // POST CreateBudgetRequestDto -> Budget
    getBudget = "/budgets/{budgetId}/", // GET -> Budget
    updateBudget = "/budgets/{budgetId}/", // PATCH UpdateBudgetRequestDto -> Budget
    deleteBudget = "/budgets/{budgetId}/", // DELETE -> ApiResponse

    // ======================
    // CUENTAS DE FACTURACIÓN
    // ======================
    // Cuentas de conductor
    getDriverBillingAccounts = "/driver-billing-accounts/", // GET -> PaginatedResponse<DriverBillingAccount>
    createDriverBillingAccount = "/driver-billing-accounts/", // POST CreateDriverBillingAccountRequestDto -> DriverBillingAccount
    getDriverBillingAccount = "/driver-billing-accounts/{accountId}/", // GET -> DriverBillingAccount
    updateDriverBillingAccount = "/driver-billing-accounts/{accountId}/", // PATCH UpdateDriverBillingAccountRequestDto -> DriverBillingAccount
    deleteDriverBillingAccount = "/driver-billing-accounts/{accountId}/", // DELETE -> ApiResponse

    // Cuentas de cliente
    getClientBillingAccounts = "/client-billing-accounts/", // GET -> PaginatedResponse<ClientBillingAccount>
    createClientBillingAccount = "/client-billing-accounts/", // POST CreateClientBillingAccountRequestDto -> ClientBillingAccount
    getClientBillingAccount = "/client-billing-accounts/{accountId}/", // GET -> ClientBillingAccount
    updateClientBillingAccount = "/client-billing-accounts/{accountId}/", // PATCH UpdateClientBillingAccountRequestDto -> ClientBillingAccount
    deleteClientBillingAccount = "/client-billing-accounts/{accountId}/", // DELETE -> ApiResponse

    // ======================
    // REGLAS DE PRECIO
    // ======================
    // Reglas por scope (client/transport)
    getPriceRules = "/price-rules/{scope}/", // GET scope=client|transport -> PaginatedResponse<PriceRuleSet>
    createPriceRule = "/price-rules/{scope}/", // POST scope=client|transport CreatePriceRuleSetRequestDto -> PriceRuleSet
    getPriceRule = "/price-rules/{scope}/{clientId}", // GET scope=client|transport -> PriceRuleSet
    updatePriceRule = "/price-rules/{scope}/{ruleId}/", // PATCH scope=client|transport UpdatePriceRuleSetRequestDto -> PriceRuleSet
    deletePriceRule = "/price-rules/{scope}/{ruleId}/", // DELETE scope=client|transport -> ApiResponse

    // Brackets de distancia
    getDistanceBrackets = "/price-rules/{scope}/brackets/", // GET scope=client|transport -> PaginatedResponse<DistanceBracket>
    createDistanceBracket = "/price-rules/{scope}/brackets/", // POST scope=client|transport CreateDistanceBracketRequestDto -> DistanceBracket
    getDistanceBracket = "/price-rules/{scope}/brackets/{bracketId}/", // GET scope=client|transport -> DistanceBracket
    updateDistanceBracket = "/price-rules/{scope}/brackets/{bracketId}/", // PATCH scope=client|transport UpdateDistanceBracketRequestDto -> DistanceBracket
    deleteDistanceBracket = "/price-rules/{scope}/brackets/{bracketId}/", // DELETE scope=client|transport -> ApiResponse

    // ======================
    // SERVICIOS ADICIONALES
    // ======================
    // Servicios de transporte
    getTransportAdditionalServices = "/additional-services/transport/", // GET -> PaginatedResponse<TransportAdditionalService>
    createTransportAdditionalService = "/additional-services/transport/", // POST CreateTransportAdditionalServiceRequestDto -> TransportAdditionalService
    getTransportAdditionalService = "/additional-services/transport/{serviceId}/", // GET -> TransportAdditionalService
    updateTransportAdditionalService = "/additional-services/transport/{serviceId}/", // PATCH UpdateTransportAdditionalServiceRequestDto -> TransportAdditionalService
    deleteTransportAdditionalService = "/additional-services/transport/{serviceId}/", // DELETE -> ApiResponse

    // Servicios de cliente
    getClientAdditionalServices = "/additional-services/client/", // GET -> PaginatedResponse<ClientAdditionalService>
    createClientAdditionalService = "/additional-services/client/", // POST CreateClientAdditionalServiceRequestDto -> ClientAdditionalService
    getClientAdditionalService = "/additional-services/client/{serviceId}/", // GET -> ClientAdditionalService
    updateClientAdditionalService = "/additional-services/client/{serviceId}/", // PATCH UpdateClientAdditionalServiceRequestDto -> ClientAdditionalService
    deleteClientAdditionalService = "/additional-services/client/{serviceId}/", // DELETE -> ApiResponse

    // ======================
    // EXÁMENES
    // ======================
    getExams = "/exams/", // GET -> PaginatedResponse<Exam>
    createExam = "/exams/", // POST CreateExamRequestDto -> Exam
    getExam = "/exams/{examId}/", // GET -> Exam
    updateExam = "/exams/{examId}/", // PATCH UpdateExamRequestDto -> Exam
    deleteExam = "/exams/{examId}/", // DELETE -> ApiResponse

    // ======================
    // CERTIFICACIONES
    // ======================
    getCertifications = "/certifications/", // GET -> PaginatedResponse<Certification>
    createCertification = "/certifications/", // POST CreateCertificationRequestDto -> Certification
    getCertification = "/certifications/{certificationId}/", // GET -> Certification
    updateCertification = "/certifications/{certificationId}/", // PATCH UpdateCertificationRequestDto -> Certification
    deleteCertification = "/certifications/{certificationId}/", // DELETE -> ApiResponse
    createManualCertification = "/certifications/manual/", // POST CreateManualCertificationRequestDto -> Certification
    getCertificationByDriverAndClient = "/certifications/certification-by-client/{driverId}/", // GET -> PaginatedResponse<Certification>
    // ======================
    // CERTIFICACIONES
    // ======================
    getClientCertifications = "/certifications/client-certifications/",
    updateClientCertification = "/certifications/client-certifications/{certificationId}/", // PATCH UpdateCertificationRequestDto -> Certification
    


    // ======================
    // DOCUMENTOS DE CONDUCTOR
    // ======================
    getDriverDocuments = "/driver-documents/", // GET -> PaginatedResponse<DriverDocument>
    createDriverDocument = "/driver-documents/", // POST CreateDriverDocumentRequestDto -> DriverDocument
    getDriverDocument = "/driver-documents/{documentId}/", // GET -> DriverDocument
    updateDriverDocument = "/driver-documents/{documentId}/", // PATCH UpdateDriverDocumentRequestDto -> DriverDocument
    deleteDriverDocument = "/driver-documents/{documentId}/", // DELETE -> ApiResponse
    validateDriverDocument = "/driver-documents/{documentId}/validate/", // PUT ValidateDriverDocumentRequestDto -> ApiResponse
    invalidateDriverDocument = "/driver-documents/{documentId}/invalidate/", // PUT InvalidateDriverDocumentRequestDto -> ApiResponse
    exportDriverDocumentsCSV = "/driver-documents/export-csv/", // GET -> CSV file

    // ======================
    // AJUSTES
    // ======================
    getAdjustments = "/adjustments/", // GET -> PaginatedResponse<Adjustment>
    createAdjustment = "/adjustments/", // POST CreateAdjustmentRequestDto -> Adjustment
    getAdjustment = "/adjustments/{adjustmentId}/", // GET -> Adjustment
    updateAdjustment = "/adjustments/{adjustmentId}/", // PATCH UpdateAdjustmentRequestDto -> Adjustment
    deleteAdjustment = "/adjustments/{adjustmentId}/", // DELETE -> ApiResponse

    // ======================
    // LISTAS NEGRAS
    // ======================
    getBlacklists = "/blacklists/", // GET -> PaginatedResponse<BlackList>
    createBlacklist = "/blacklists/", // POST CreateBlackListRequestDto -> BlackList
    getBlacklist = "/blacklists/{blacklistId}/", // GET -> BlackList
    updateBlacklist = "/blacklists/{blacklistId}/", // PATCH UpdateBlackListRequestDto -> BlackList
    deleteBlacklist = "/blacklists/{blacklistId}/", // DELETE -> ApiResponse

    // ======================
    // INCIDENCIAS
    // ======================
    getIncidences = "/incidences/", // GET -> PaginatedResponse<Incidence>
    createIncidence = "/incidences/", // POST CreateIncidenceRequestDto -> Incidence
    getIncidence = "/incidences/{incidenceId}/", // GET -> Incidence
    updateIncidence = "/incidences/{incidenceId}/", // PATCH UpdateIncidenceRequestDto -> Incidence
    deleteIncidence = "/incidences/{incidenceId}/", // DELETE -> ApiResponse

    // ======================
    // PLANTILLAS DE DOCUMENTOS
    // ======================
    getDocumentTemplates = "/document-templates/", // GET -> PaginatedResponse<DocumentTemplate>
    createDocumentTemplate = "/document-templates/", // POST CreateDocumentTemplateRequestDto -> DocumentTemplate
    getDocumentTemplate = "/document-templates/{templateId}/", // GET -> DocumentTemplate
    updateDocumentTemplate = "/document-templates/{templateId}/", // PATCH UpdateDocumentTemplateRequestDto -> DocumentTemplate
    deleteDocumentTemplate = "/document-templates/{templateId}/", // DELETE -> ApiResponse
    getDocumentTemplatesByClient = "/document-templates/by-client/{clientId}/", // GET -> PaginatedResponse<DocumentTemplate>

    // ======================
    // ETIQUETAS
    // ======================
    getTags = "/tags/", // GET -> PaginatedResponse<Tag>
    createTag = "/tags/", // POST CreateTagRequestDto -> Tag
    getTag = "/tags/{tagId}/", // GET -> Tag
    updateTag = "/tags/{tagId}/", // PATCH UpdateTagRequestDto -> Tag
    deleteTag = "/tags/{tagId}/", // DELETE -> ApiResponse

    // ======================
    // ARCHIVOS ESTÁTICOS
    // ======================
    getMediaFile = "/media/{path}", // GET -> File
    getAPISchema = "/schema/", // GET -> OpenAPI Schema
    getSwaggerDocs = "/docs/", // GET -> Swagger UI
}

/**
 * Tipos de HTTP methods utilizados en el API
 */
export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}

/**
 * Utilidad para construir URLs con parámetros
 * @param endpoint El endpoint del enum
 * @param params Objeto con los parámetros a reemplazar
 * @returns URL construida con los parámetros
 * 
 * @example
 * buildUrl(EndPoints.getUser, { userId: '123' })
 * // Resultado: "/users/123/"
 * 
 * buildUrl(EndPoints.getPriceRules, { scope: 'client' })
 * // Resultado: "/price-rules/client/"
 */
export function buildUrl(endpoint: EndPoints, params?: Record<string, string | number>): string {
    let url = endpoint as string;

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            url = url.replace(`{${key}}`, String(value));
        });
    }

    return url;
}

/**
 * Utilidad para extraer parámetros de una URL endpoint
 * @param endpoint El endpoint del enum
 * @returns Array con los nombres de los parámetros
 * 
 * @example
 * getUrlParams(EndPoints.getUser)
 * // Resultado: ['userId']
 * 
 * getUrlParams(EndPoints.getPriceRule)
 * // Resultado: ['scope', 'ruleId']
 */
export function getUrlParams(endpoint: EndPoints): string[] {
    const matches = (endpoint as string).match(/\{([^}]+)\}/g);
    if (!matches) return [];

    return matches.map(match => match.slice(1, -1));
}

/**
 * Utilidad para validar que se proporcionaron todos los parámetros requeridos
 * @param endpoint El endpoint del enum
 * @param params Objeto con los parámetros proporcionados
 * @returns true si todos los parámetros están presentes
 */
export function validateParams(endpoint: EndPoints, params?: Record<string, string | number>): boolean {
    const requiredParams = getUrlParams(endpoint);

    if (requiredParams.length === 0) {
        return true;
    }

    if (!params) {
        return false;
    }

    return requiredParams.every(param => params[param] !== undefined);
}